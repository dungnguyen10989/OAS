import * as React from 'react';
import { Dispatch } from 'redux';
import { getOr } from 'lodash/fp';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import { AppState } from 'c-redux';
import { _NavigationProps, IContainerProps } from 'ui-kit';

import { colors, dims } from '../constants';
import Boundary from './Boundary';
import { UIKit } from '../components';
import { routes } from '.';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  NavigationScreenConfig,
  NavigationScreenOptions
} from 'react-navigation';
import { Easing, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import normalize from '../utils/normalize';
import { requestDetailSelectors, requestDetailActions } from '../redux/requestDetail';
import moment from 'moment';

const space = dims.getBottomSpace() > 0 ? dims.getBottomSpace() - 10 : 0;
const height = normalize(40);

interface Item {
  key: string;
  value?: string;
  type?: 'FILE' | undefined;
  require: boolean;
}

interface Props extends IContainerProps {
  detail: any;
  fetchingDetail: number;
  getDetail: (prams: { type: string; id: string }) => void;
  clearRequestDetail: () => void;
}

const mapStateToProps = (state: AppState) => ({
  detail: requestDetailSelectors(state).detail,
  fetchingDetail: requestDetailSelectors(state).fetchingDetail
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDetail: (params: { type: string; id: string }) =>
    dispatch(requestDetailActions.getRequestDetail(params)),
  clearRequestDetail: () => dispatch(requestDetailActions.clearRequestDetail())
});

interface State {
  scrolling: boolean;
}
class RequestSummary extends React.Component<Props, any> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenConfig<NavigationScreenOptions> => {
    const onRightPress = navigation.getParam('rightButtonPress');
    const title = navigation.getParam('title');
    const size = dims.topBarButtonSize;
    return {
      headerStyle: {
        borderBottomWidth: 0
      },
      headerTitle: title,
      headerRight: (
        <UIKit.HeaderButton onPress={onRightPress}>
          <UIKit.assets.icons.Feather.MoreVertical width={size} height={size} stroke="#fff" />
        </UIKit.HeaderButton>
      )
    };
  };

  private actionSheet = React.createRef<ActionSheet>();
  private top = new UIKit.Core.Animated.Value(0);
  private paddingBottom = space;

  constructor(props: Props) {
    super(props);
    this.props.navigation.setParams({ rightButtonPress: this.openSheet });
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillUnmount() {
    this.props.clearRequestDetail();
  }

  fetch = () => {
    const { navigation, getDetail } = this.props;
    const id = navigation.getParam('id');
    const type = navigation.getParam('type');
    getDetail({ type, id });
  };

  convertDate = (date: string) => {
    if (date) {
      return moment(date)
        .toDate()
        .toLocaleDateString();
    }
    return undefined;
  };

  openSheet = () => {
    if (this.actionSheet.current) {
      this.actionSheet.current.show();
    }
  };

  renderSeparator = () => <UIKit.View style={styles.separator} />;

  renderItem = ({
    item
  }: {
    item: {
      key: string;
      value?: string;
      isRequire?: boolean;
    };
    index: number;
  }) => {
    return (
      <UIKit.View style={styles.item}>
        <UIKit.Text style={styles.key}>
          {item.key}
          {item.isRequire ? <UIKit.Text color={colors.main.red}> * </UIKit.Text> : null}
          {': '}
        </UIKit.Text>
        <UIKit.Text style={styles.value}>{item.value}</UIKit.Text>
      </UIKit.View>
    );
  };
  renderFooter = () => <UIKit.Button />;

  genKey = (item: Item) => `key-${item.key}`;

  navigate = (routeName: string, params?: NavigationParams) => {
    this.props.navigation.navigate(routeName, params);
  };

  onActionSheetItemPress = (index: number) => {
    const { navigation } = this.props;
    const detail = getOr({}, 'detail', this.props) || {};

    const isOpening = detail.approveStatus === 'Opening';

    if ((isOpening && index === 1) || index === 2) {
      return;
    }

    const _route = isOpening
      ? routes.EditRequest
      : index === 0
      ? routes.ApprovalHistory
      : routes.FileAttached;
    const id = navigation.getParam('id');
    const type = navigation.getParam('type');

    this.navigate(_route, { id, type });
  };

  onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let paddingToBottom = this.paddingBottom + height;
    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
    const toValue =
      e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - paddingToBottom ? 1 : 0;
    UIKit.Core.Animated.timing(this.top, {
      toValue,
      duration: 100,
      easing: Easing.linear
    }).start();
  };

  renderContent = () => {
    const { t } = this.props.screenProps;
    const detail = getOr({}, 'detail', this.props) || {};
    const request = getOr({}, 'request', detail) || {};
    const isOpening = detail.approveStatus === 'Opening';

    const _data = [
      { key: t('summary.applyFor'), value: request.comCode, isRequire: true },
      { key: t('summary.id'), value: detail.id, isRequire: true },
      { key: t('summary.unit'), value: request.unitCode, isRequire: true },

      { key: t('summary.department'), value: request.departmentCode, isRequire: true },
      { key: t('summary.requestCode'), value: detail.requestCode, isRequire: true },
      { key: t('summary.originalSource'), value: request.originalSource + '', isRequire: true },
      {
        key: t('summary.approveRequestGroupCode'),
        value: detail.approveRequestGroupCode,
        isRequire: true
      },
      { key: t('summary.approvedBy'), value: detail.approvedBy, isRequire: true },
      {
        key: t('summary.approveDate'),
        value: this.convertDate(detail.approveDate),
        isRequire: true
      },
      { key: t('summary.approveStatus'), value: detail.approveStatus, isRequire: true },
      { key: t('summary.stepNum'), value: detail.stepNum, isRequire: true },
      { key: t('summary.createdBy'), value: detail.createdBy, isRequire: true },
      {
        key: t('summary.createdDate'),
        value: this.convertDate(detail.createdDate),
        isRequire: true
      },
      { key: t('summary.assignDate'), value: this.convertDate(detail.assignDate), isRequire: true },
      {
        key: t('summary.deadlineApprove'),
        value: this.convertDate(detail.deadlineApprove),
        isRequire: true
      },
      { key: t('summary.requestNotes'), value: detail.requestNotes, isRequire: true },
      { key: t('summary.requestReason'), value: detail.requestReason, isRequire: true },
      { key: t('summary.approveNotes'), value: detail.approveNotes, isRequire: true },
      { key: t('summary.amount'), value: detail.amount, isRequire: true },
      {
        key: t('summary.approveGroupForMoreTask'),
        value: detail.approveGroupForMoreTask,
        isRequire: false
      },
      { key: t('summary.addMoreTaskReason'), value: detail.addMoreTaskReason, isRequire: false },
      { key: t('summary.overDeadline'), value: detail.overDeadline, isRequire: false },
      { key: t('summary.remindDeadline'), value: detail.remindDeadline, isRequire: false },
      { key: t('summary.isLock'), value: detail.isLock, isRequire: false },
      { key: t('summary.returnedBy'), value: detail.returnedBy, isRequire: false },
      { key: t('summary.returnedStep'), value: detail.returnedStep, isRequire: false },
      {
        key: t('summary.returnedDate'),
        value: this.convertDate(detail.returnedDate),
        isRequire: false
      },
      { key: t('summary.returnedTo'), value: detail.returnedTo, isRequire: false }
    ];

    return (
      <React.Fragment>
        <UIKit.FlatList
          data={_data}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={this.genKey}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
        />
        <ActionSheet
          ref={this.actionSheet}
          options={
            isOpening
              ? [t('btn.editRequest'), t('btn.cancel')]
              : [t('btn.approvalHistory'), t('btn.fileAttached'), t('btn.cancel')]
          }
          cancelButtonIndex={isOpening ? 1 : 2}
          onPress={this.onActionSheetItemPress}
        />
      </React.Fragment>
    );
  };

  render() {
    const bottom = this.top.interpolate({
      inputRange: [0, 1],
      outputRange: [-height, space]
    });
    const { detail, navigation, fetchingDetail, screenProps } = this.props;

    const visible = detail && !['Approved', 'Opening'].includes(detail.approveStatus);
    const id = navigation.getParam('id');
    const type = navigation.getParam('type');

    return (
      <Boundary style={styles.flex1}>
        <UIKit.FetchingBoundary
          style={styles.content}
          fetchingStatus={fetchingDetail}
          onReconnect={this.fetch}
        >
          {this.renderContent()}
        </UIKit.FetchingBoundary>
        {visible ? (
          <UIKit.Core.Animated.View style={[styles.btn, { bottom }]}>
            <UIKit.Button
              style={styles.button}
              title={screenProps.t('btn.approve')}
              onPress={this.navigate.bind(this, routes.Approve, { id, type })}
            />
          </UIKit.Core.Animated.View>
        ) : null}
      </Boundary>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestSummary);

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.separator
  },
  flex1: {
    flex: 1
  },
  btn: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.main.orange
  },
  list: {
    paddingBottom: space + height
  },
  content: {
    padding: dims.DEFAULT_PADDING
  },
  item: {
    flexDirection: 'row',
    padding: dims.DEFAULT_PADDING,
    justifyContent: 'center'
  },
  key: {
    color: '#000',
    fontWeight: 'bold',
    flex: 4,
    fontSize: dims.fontSize.small
  },
  value: {
    marginLeft: 10,
    flex: 6,
    fontSize: dims.fontSize.small,
    color: 'gray'
  },
  separator: {
    height: 1,
    backgroundColor: colors.border
  },
  button: {
    height,
    width: '100%',
    borderRadius: 10
  }
});
