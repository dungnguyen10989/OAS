import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };
  window.postMessage = patchedPostMessage;
})})();`;

export default class MessageWebView extends React.Component<any, any> {
  private webview = React.createRef<WebView>();

  constructor(props: any) {
    super(props);
    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(action) {
    if (this.webview.current) {
      this.webview.current.postMessage(JSON.stringify(action));
    }
  }

  goBack = () => {
    if (this.webview.current) {
      this.webview.current.goBack();
    }
  };

  render() {
    const { html, source, url, onMessage, ...props } = this.props;

    return (
      <View style={props.containerStyle}>
        <WebView
          {...props}
          style={props.containerStyle}
          javaScriptEnabled
          useWebKit={false}
          automaticallyAdjustContentInsets
          injectedJavaScript={patchPostMessageJsCode}
          source={source ? source : html ? { html } : url}
          ref={this.webview}
          onMessage={e => onMessage(e.nativeEvent.data)}
        />
      </View>
    );
  }
}
