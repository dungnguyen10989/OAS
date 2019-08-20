import * as React from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
  NavigationScreenOptions,
  NavigationScreenConfig,
  NavigationEventSubscription
} from 'react-navigation';
import { connect } from 'react-redux';

import { filterSelectors, filterActions } from '../../redux/filter';
import { taskActions } from '../../redux/task';
import SearchBar from './SearchBar';
import MyRequest from './MyApproved';
import FilterRequest from './FilterRequest';
import { _NavigationProps, IContainerProps } from 'ui-kit';
import { dims, colors } from '../../constants';
import { UIKit } from '../../components';
import { GestureResponderEvent, Keyboard, BackHandler, ToastAndroid } from 'react-native';
import { routes } from '..';
import { AppState } from 'c-redux';
import { Dispatch } from 'react-redux/node_modules/redux';

interface State {
  index: number;
  backClickCount?: number;
  routes: Array<{
    key: string;
    title: string;
  }>;
}

interface Props extends IContainerProps {
  filter: any;
  setFilter: (filter: any) => void;
  getRequest: (params: any) => void;
  clearRequest: () => void;
}

const mapStateToProps = (state: AppState) => ({
  filter: filterSelectors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFilter: (filter: any) => dispatch(filterActions.setFilter(filter)),
  getRequest: (params: any) => dispatch(taskActions.getTask(params)),
  clearRequest: () => dispatch(taskActions.clearTask())
});

class RequestList extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation
  }: {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }): NavigationScreenConfig<NavigationScreenOptions> => {
    const headerRight = navigation.getParam('headerRight');
    const headerTitle = navigation.getParam('headerTitle');
    const size = dims.topBarButtonSize;
    return {
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0
      },
      headerLeft: (
        <UIKit.HeaderButton onPress={navigation.openDrawer}>
          <UIKit.assets.icons.Feather.Menu width={size} height={size} stroke="#fff" />
        </UIKit.HeaderButton>
      ),
      headerTitle,
      headerRight
    };
  };

  private willFocus: NavigationEventSubscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      backClickCount: 0,
      routes: [
        { key: 'first', title: this.props.screenProps.t('btn.unapproved') },
        { key: 'second', title: this.props.screenProps.t('btn.approved') }
      ]
    };
    this.setHeaderRight(0);

    this.willFocus = this.props.navigation.addListener('willFocus', Keyboard.dismiss);
    this.props.navigation.setParams({ onSearch: this.onSearch });
    this.props.navigation.setParams({ headerTitle: this.renderTitle });
  }

  renderTitle = () => {
    return (
      <SearchBar
        visible={this.state.index === 0}
        onSearch={(text?: string) => this.onSearch(text)}
      />
    );
  };

  onSearch = (text?: string) => {
    const { filter } = this.props;

    if (filter.keyword !== text && this.state.index === 0) {
      this.props.setFilter({ keyword: text });
      this.props.clearRequest();
      this.props.getRequest({
        ...filter,
        pageNumber: 0,
        keyword: text,
        excludedApprovedRequest: true
      });
    }
  };

  handleBackButton = () => {
    if (this.state.backClickCount == 1) {
      BackHandler.exitApp();
    } else {
      this.setState({ backClickCount: 1 }, () => {
        ToastAndroid.showWithGravity(
          'Double press Back button to exit app',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setTimeout(() => this.setState({ backClickCount: 0 }), 2000);
      });
    }

    return true;
  };

  componentWillUnmount() {
    if (this.willFocus) {
      this.willFocus.remove();
    }
  }

  setHeaderRight = (index: number) => {
    const size = dims.topBarButtonSize;
    const onFilterPress = (e: GestureResponderEvent) => {
      if (index === 0) {
        this.props.navigation.navigate(routes.Filter);
      }
    };

    const headerRight = (
      <UIKit.HeaderButton opacity={index === 0 ? 0.7 : 1} onPress={onFilterPress}>
        <UIKit.assets.icons.Feather.Filter
          width={size}
          height={size}
          stroke={index === 0 ? '#fff' : 'gray'}
        />
      </UIKit.HeaderButton>
    );

    this.props.navigation.setParams({ headerRight });
  };

  onChangeText = (text: string) => {};

  setIndex = (index: number) => {
    if (this.state.index === index) {
      return;
    }
    this.setState({ index });
    this.setHeaderRight(index);
  };

  _renderScene = (route: any) => {
    const scenes = {
      first: <FilterRequest {...this.props} />,
      second: <MyRequest {...this.props} />
    };
    return scenes[route.route.key];
  };

  render() {
    return (
      <TabView
        style={{ backgroundColor: 'transparent' }}
        navigationState={this.state}
        lazy
        swipeEnabled={false}
        lazyPreloadDistance={0}
        renderTabBar={props => (
          <TabBar
            {...props}
            pressOpacity={0.8}
            indicatorStyle={{ backgroundColor: colors.status.approved, height: 5 }}
            style={{ backgroundColor: colors.main.red }}
          />
        )}
        keyboardDismissMode="auto"
        renderScene={this._renderScene}
        onIndexChange={this.setIndex}
        initialLayout={{ width: dims.screenWidth }}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);
