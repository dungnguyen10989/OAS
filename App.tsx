import 'rxjs';
import './src/utils/prototype';

import * as React from 'react';
import { NavigationState, NavigationParams, NavigationScreenProp } from 'react-navigation';
import { useScreens } from 'react-native-screens';
import OneSignal from 'react-native-onesignal';

import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import RNSecureStorage from 'rn-secure-storage';
import NetInfo from '@react-native-community/netinfo';
import { Action } from 'redux';

import { setLocale } from './src/utils/setLocale';
import createRootNavigator, { setTopLevelNavigator } from './src/utils/navigationServices';
import I18n from './src/i18n';
import { Navs, routes } from './src/containers';
import store from './src/redux/store';
import { storageKeys, defaultLanguage, uriPrefix, dims } from './src/constants';
import { UIKit } from './src/components';
import { colors } from './src/constants';

useScreens();

interface State {
  locale: string;
  online: boolean;
  ran: string | undefined;
  ready: boolean;
}

export default class App extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      locale: defaultLanguage,
      online: false,
      ran: undefined,
      ready: false
    };

    OneSignal.init('80c9bf5d-1494-4346-8cfc-c39e28e6ae61', {
      kOSSettingsKeyAutoPrompt: true,
      kOSSettingsKeyInFocusDisplayOption: 2
    });

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }

  onReceived = notification => {
    console.log('onReceived', notification);
  };

  onOpened = notification => {
    console.log('onOpened', notification);
  };

  onIds = notification => {
    console.log('onIds', notification);
  };

  componentDidMount() {
    this.getConnection();
    this.subscribeNetInfo();
    this.getLocale();
    SplashScreen.hide();
  }

  getConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      this.setState({ online: state.isConnected });
    } catch (error) {
      if (__DEV__) {
        console.log('NetInfo error: ', error.message);
      }
    }
  };

  subscribeNetInfo = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ online: state.isConnected });
    });
    unsubscribe();
  };

  getLocale = async () => {
    let locale = defaultLanguage;
    let ran = undefined;
    try {
      locale = await RNSecureStorage.get(storageKeys.locale);
    } catch (error) {}

    try {
      ran = await RNSecureStorage.get(storageKeys.ran);
    } catch (error) {}

    setLocale(locale);
    this.setState({ locale, ran, ready: true });
  };

  setLocale = (locale: string) => {
    if (locale === I18n.locale) {
      return;
    }

    setLocale(locale);
    this.setState({ locale });
  };

  translate = (key: string) => I18n.t(key);

  render() {
    const { locale, online, ran, ready } = this.state;

    if (!ready) {
      return null;
    }

    const init = ran ? 'Auth' : 'Introduce';

    const RootNavigation = createRootNavigator('App');

    return (
      <Provider store={store}>
        <UIKit.Core.StatusBar backgroundColor={colors.main.red} barStyle="light-content" />
        <RootNavigation
          ref={(navigatorRef: any) => setTopLevelNavigator(navigatorRef)}
          uriPrefix={uriPrefix}
          screenProps={{
            locale,
            online,
            setLocale: this.setLocale,
            t: this.translate
          }}
        />
        <UIKit.Dialog />
      </Provider>
    );
  }
}

export const Routes = {
  ...routes,
  AuthNavigator: 'Auth',
  AppNavigator: 'App',
  SettingsStack: 'SettingsStack',
  HomeStack: 'HomeStack'
};
