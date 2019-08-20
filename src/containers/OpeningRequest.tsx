import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, FetchRequestParams } from 'c-redux';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import _ from 'lodash';

import { colors, dims } from '../constants';
import Boundary from './Boundary';
import { UIKit } from '../components';
import RequestItem from './requestList/Item';
import { openingRequestSelectors, openingRequestActions } from '../redux/openingRequest';

interface Props extends IContainerProps {
  data: Array<any>;
  fetchingRequest: number;
  pageNumber: number;
  getData: (payload?: FetchRequestParams, onSuccess?: Function, onError?: Function) => any;
  cancelFetch: () => void;
}

const mapStateToProps = (state: AppState) => ({
  data: openingRequestSelectors(state).data,
  fetchingRequest: openingRequestSelectors(state).fetchingOpeningRequest,
  pageNumber: openingRequestSelectors(state).pageNumber
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData: (payload?: FetchRequestParams) =>
    dispatch(openingRequestActions.getOpeningRequest(payload)),
  cancelFetch: () => dispatch(openingRequestActions.getOpeningRequestCancel())
});

interface State {
  swipedIndex: number;
}

class RequestList extends React.Component<Props, State> {
  renderSeparator = () => <UIKit.View style={styles.separator} />;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { data, getData, pageNumber } = this.props;
    if (Array.isArray(data) && data.length === 0) {
      getData({ pageNumber });
    }
  };

  refreshData = () => {
    const { getData, fetchingRequest } = this.props;
    if ([0, -1].includes(fetchingRequest)) {
      getData({ pageNumber: undefined });
    }
  };

  renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <RequestItem
        type="my-approved"
        data={{ ...item, id: item.code }}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const { fetchingRequest, data } = this.props;

    return (
      <Boundary>
        <UIKit.FlatList
          onRefresh={this.refreshData}
          ItemSeparatorComponent={this.renderSeparator}
          fetchingStatus={fetchingRequest}
          style={styles.listW}
          contentContainerStyle={styles.list}
          keyExtractor={item => `${item.id}`}
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
          onLoadMore={this.fetchData}
        />
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);

const styles = UIKit.Core.StyleSheet.create({
  separator: {
    height: 10,
    width: '100%'
  },
  listW: {
    backgroundColor: colors.separator
  },
  list: {
    padding: dims.DEFAULT_PADDING,
    paddingBottom: dims.getBottomSpace()
  }
});
