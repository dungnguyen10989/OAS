import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';
import AutoHeightWebView from 'react-native-autoheight-webview';
import WebView from 'react-native-webview';
import Boundary from './Boundary';
import { _NavigationProps } from 'ui-kit';
import { dims } from '../constants';

const arr = new Array(6).fill(0);

interface State {
  ready: boolean;
}

export default class RequestDetail extends React.Component<_NavigationProps, State> {
  state = {
    ready: false
  };

  renderLoading = () => {
    return (
      <View style={styles.loading}>
        {arr.map((i: any, index: number) => (
          <Placeholder
            key={`${index}`}
            Animation={Fade}
            Left={PlaceholderMedia}
            style={styles.placeholder}
          >
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        ))}
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('url');

    return (
      <Boundary>
        {this.state.ready ? null : this.renderLoading()}
        <AutoHeightWebView files={[uri]} source={{ uri }} zoomable />
      </Boundary>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'red'
  },
  loading: {
    padding: dims.DEFAULT_PADDING
  },
  placeholder: {
    marginVertical: 10
  }
});
