import * as React from 'react';
import { Text, StyleSheet, ViewStyle, View, AppState } from 'react-native';
import Navigation, {
  NavigationState,
  NavigationEventSubscription,
  NavigationScreenProp,
  NavigationParams
} from 'react-navigation';
import { IContainerProps } from 'ui-kit';

type _AppState = 'inactive' | 'background' | 'active';
interface State {
  appState: _AppState;
  hasError?: Error | undefined;
  isAppear: boolean;
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  style?: ViewStyle;
}

export default class Boundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: error };
  }

  private didBlurSubscription: NavigationEventSubscription;
  private willFocusSubscription: NavigationEventSubscription;

  constructor(props: any) {
    super(props);
    this.state = { hasError: undefined, appState: 'active', isAppear: false };
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', payload =>
      this.setState({ isAppear: true })
    );
    this.didBlurSubscription = this.props.navigation.addListener('didBlur', payload =>
      this.setState({ isAppear: false })
    );
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.willFocusSubscription.remove();
    this.didBlurSubscription.remove();
  }

  _handleAppStateChange = (nextAppState: _AppState) => {
    this.setState({ appState: nextAppState });
  };

  render() {
    const { hasError, appState, isAppear } = this.state;
    const { children, style } = this.props;

    if (appState !== 'active' && isAppear) {
      return null;
    }

    console.log('rerender');

    return (
      <View style={[styles.wrapper, style]}>
        {hasError && !__DEV__ ? (
          <Text style={styles.errorText}>
            An error has ocurred when render data, please try again!
          </Text>
        ) : (
          children
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  errorText: {
    margin: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
