import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, FetchRequestParams } from 'c-redux';
import { _NavigationProps, IContainerProps } from 'ui-kit';

import { colors, dims } from '../../constants';
import Boundary from '../Boundary';
import { UIKit } from '../../components';
import RequestItem from './Item';
import { routes } from '..';
import { myApprovedSelectors, myApprovedActions } from '../../redux/myApproved';

interface Props extends IContainerProps {
  data: Array<any>;
  fetchingMyApproved: number;
  getData: (payload?: FetchRequestParams, onSuccess?: Function, onError?: Function) => any;
  pageNumber: number;
}

const mapStateToProps = (state: AppState) => ({
  data: myApprovedSelectors(state).data,
  fetchingMyApproved: myApprovedSelectors(state).fetchingMyApproved,
  pageNumber: myApprovedSelectors(state).pageNumber
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData: (payload?: FetchRequestParams) => dispatch(myApprovedActions.getMyApproved(payload))
});

class RequestList extends React.Component<Props, any> {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { getData, pageNumber } = this.props;

    getData({ pageNumber, status: 'Approved' });
  };

  renderSeparator = () => <UIKit.View style={styles.separator} />;

  refreshData = () => {
    const { getData, fetchingMyApproved } = this.props;
    if ([0, -1].includes(fetchingMyApproved)) {
      getData({ pageNumber: undefined, status: 'Approved' });
    }
  };

  onItemPress = (item: any) =>
    this.props.navigation.navigate(routes.RequestSummary, {
      id: item.id,
      type: item.type,
      title: item.name
    });

  renderItem = ({ item }: { item: any; index: number }) => (
    <RequestItem type="my-approved" data={item} navigation={this.props.navigation} />
  );

  render() {
    const { fetchingMyApproved, data } = this.props;
    console.log('re-render', this.props.data);

    return (
      <Boundary>
        <UIKit.FlatList
          onRefresh={this.refreshData}
          ItemSeparatorComponent={this.renderSeparator}
          fetchingStatus={fetchingMyApproved}
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
