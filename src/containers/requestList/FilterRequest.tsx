import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, FetchRequestParams } from 'c-redux';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import _ from 'lodash';

import { colors, dims } from '../../constants';
import Boundary from '../Boundary';
import { UIKit } from '../../components';
import RequestItem from './Item';
import { filterSelectors } from '../../redux/filter';
import { taskSelectors, taskActions } from '../../redux/task';

interface Props extends IContainerProps {
  query?: string;
  data: Array<any>;
  fetchingRequest: number;
  filter: any;
  getData: (payload?: FetchRequestParams, onSuccess?: Function, onError?: Function) => any;
  pageNumber: number;
  cancelFetch: () => void;
}

const mapStateToProps = (state: AppState) => ({
  data: taskSelectors(state).data,
  fetchingRequest: taskSelectors(state).fetchingTask,
  filter: filterSelectors(state),
  pageNumber: taskSelectors(state).pageNumber
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getData: (payload?: FetchRequestParams) => dispatch(taskActions.getTask(payload)),
  cancelFetch: () => dispatch(taskActions.getTaskCancel())
});

interface State {
  swipedIndex: number;
}

class RequestList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      swipedIndex: -1
    };
  }

  renderSeparator = () => <UIKit.View style={styles.separator} />;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { filter, getData, pageNumber } = this.props;
    getData({ ...filter, pageNumber, excludedApprovedRequest: true });
  };

  refreshData = () => {
    const { filter, getData, fetchingRequest } = this.props;
    if ([0, -1].includes(fetchingRequest)) {
      getData({ ...filter, pageNumber: undefined, excludedApprovedRequest: true });
    }
  };

  renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <RequestItem
        type="all"
        setActivateIndex={() => this.setState({ swipedIndex: index })}
        isOpen={this.state.swipedIndex === index}
        data={item}
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
