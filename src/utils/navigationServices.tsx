import * as React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  Header,
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationNavigateAction
} from 'react-navigation';

import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import Introduce from '../containers/Introduce';
import I18n from '../i18n';
import { Navs, routes } from '../containers';
import Drawer from '../containers/drawer';
import { UIKit } from '../components';
import { dims, colors } from '../constants';
import { StyleSheet, Keyboard, Platform } from 'react-native';

type InitialRouteName = 'Auth' | 'App' | 'Introduce';

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: Platform.OS === 'ios' ? Header.HEIGHT - 20 : Header.HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: colors.main.red,
    flex: 1
  }
});

const Main = createStackNavigator(
  {
    Home: { screen: Navs[routes.Home] },
    Profile: { screen: Navs[routes.Profile] },
    RequestList: { screen: Navs[routes.RequestList] },
    RequestSummary: { screen: Navs[routes.RequestSummary] },
    ApprovalHistory: { screen: Navs[routes.ApprovalHistory] },
    EditRequest: { screen: Navs[routes.EditRequest] },
    QuickApprove: { screen: Navs[routes.QuickApprove] },
    Approve: { screen: Navs[routes.Approve] },
    WebView: { screen: Navs[routes.WebView] },
    FileAttached: { screen: Navs[routes.FileAttached] },
    Settings: { screen: Navs[routes.Settings] },
    Filter: { screen: Navs[routes.Filter] },
    ListGroup: { screen: Navs[routes.ListGroup] },
    OpeningRequest: { screen: Navs[routes.OpeningRequest] },
    Modal: { screen: Navs[routes.Modal] }
  },
  {
    initialRouteName: routes.Home,
    mode: 'card',
    headerBackTitleVisible: false,
    cardOverlayEnabled: true,
    cardShadowEnabled: true,
    defaultNavigationOptions: ({ navigation }) => {
      const headerTitle = I18n.t(`routes.${navigation.state.routeName}`);

      return {
        headerBackImage: (
          <UIKit.HeaderButton wrapper="view">
            <UIKit.assets.icons.Feather.ArrowLeft
              stroke="#eee"
              width={dims.topBarButtonSize}
              height={dims.topBarButtonSize}
            />
          </UIKit.HeaderButton>
        ),
        headerStyle: { margin: 0, backgroundColor: colors.main.red },
        headerTintColor: '#eee',
        gesturesEnabled: true,
        headerTitleAllowFontScaling: true,
        swipeEnabled: true,
        headerTitle,
        headerBackTitle: '',
        headerBackgroundTransitionPreset: 'fade',
        headerLeftContainerStyle: styles.btn,
        headerRightContainerStyle: styles.btn,
        headerBackground: <UIKit.View style={styles.header} />
      };
    }
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Main: { screen: Main }
  },
  {
    backBehavior: 'history',
    contentComponent: props => <Drawer {...props} />
  }
);

const defaultGetStateForAction = AppNavigator.router.getStateForAction;

AppNavigator.router.getStateForAction = (action, state) => {
  if (action.type === 'Navigation/OPEN_DRAWER') {
    Keyboard.dismiss();
  }

  return defaultGetStateForAction(action, state);
};

const AuthNavigator = createStackNavigator(
  {
    Login: Navs[routes.Login],
    ForgotPassword: Navs[routes.ForgotPassword]
  },
  {
    initialRouteName: routes.Login,
    mode: 'card',
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center',
    headerMode: 'none'
  }
);

const createNavigator = Platform.select({
  ios: createAnimatedSwitchNavigator,
  android: createSwitchNavigator
});

const navigators = {
  Introduce,
  Auth: AuthNavigator,
  App: AppNavigator
};

const config = (initialRouteName: InitialRouteName) =>
  Platform.select({
    ios: {
      initialRouteName,
      transition: (
        <Transition.Together>
          <Transition.Out type="slide-bottom" durationMs={300} interpolation="easeInOut" />
        </Transition.Together>
      )
    },
    android: {
      initialRouteName
    }
  });

const createRootNavigator = (initialRouteName: InitialRouteName) =>
  createAppContainer(createNavigator(navigators, config(initialRouteName)));

let _navigator: NavigationScreenProp<NavigationState, NavigationParams>;

const setTopLevelNavigator = (
  navigatorRef: NavigationScreenProp<NavigationState, NavigationParams>
) => {
  _navigator = navigatorRef;
};

const navigate = (
  routeName: string,
  params?: NavigationParams,
  action?: NavigationNavigateAction
) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      action
    })
  );
};

export { styles, navigate, setTopLevelNavigator };

export default createRootNavigator;
