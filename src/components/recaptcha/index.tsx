// import React, { Component } from 'react';
// import MessageWebView from './MessageWebView';
// import PropTypes from 'prop-types';
// import { Platform, Linking, ViewStyle } from 'react-native';
// import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';

// const RECAPTCHA_SUB_STR = 'https://www.google.com/recaptcha/api2/anchor?';
// const RECAPTCHA_SUB_STR_FRAME = 'https://www.google.com/recaptcha/api2/bframe';

// export const type = Object.freeze({ invisible: 1, normal: 2 });

// const getInvisibleRecaptchaContent = (siteKey: string, action?: string, onReady?: Function) => {
//   const webForm =
//     '<!DOCTYPE html><html><head> ' +
//     '<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; } </style> ' +
//     '<script src="https://www.google.com/recaptcha/api.js?render=' +
//     siteKey +
//     '"></script> ' +
//     '<script type="text/javascript"> ' +
//     'grecaptcha.ready(function() { ' +
//     `(${String(onReady)})(); ` +
//     "grecaptcha.execute('" +
//     siteKey +
//     "', {action: '" +
//     action +
//     "'}).then( " +
//     'function (responseToken) { window.postMessage(responseToken);  } ' +
//     ' ); ' +
//     '}); ' +
//     '</script>' +
//     '</head></html>';
//   return webForm;
// };

// const getNormalRecaptchaContent = (config: any) => {
//   const webForm =
//     '<!DOCTYPE html><html><head> ' +
//     '<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; margin-right: 40px; float: right;} </style> ' +
//     '<script src="https://www.gstatic.com/firebasejs/5.1.0/firebase-app.js"></script> ' +
//     '<script src="https://www.gstatic.com/firebasejs/5.1.0/firebase-auth.js"></script> ' +
//     '<script type="text/javascript"> firebase.initializeApp(' +
//     JSON.stringify(config) +
//     '); ' +
//     '</script><script src="https://www.google.com/recaptcha/api.js"></script> ' +
//     '</head> ' +
//     '<body><div id="recaptcha-cont" class="g-recaptcha"></div>' +
//     '<script> ' +
//     'function onloadCallback() { ' +
//     'window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-cont", ' +
//     '{size: "normal", callback: function(response) { window.postMessage(response); }}); ' +
//     'window.recaptchaVerifier.render(); ' +
//     '} ' +
//     '</script>' +
//     '<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"></script>' +
//     '</body> </html>';
//   return webForm;
// };

// interface Props {
//   reCaptchaType: number;
//   siteKey: string;
//   onExecute: (message: any) => any;

//   containerStyle?: ViewStyle;
//   action?: string;
//   onReady?: Function;
//   config?: any;
//   url?: string;
// }

// export default class ReCaptcha extends Component<Props> {
//   private webview = React.createRef<MessageWebView>();

//   static defaultProps = {
//     onReady: () => {},
//     onExecute: () => {},
//     action: '',
//     containerStyle: {
//       width: '100%',
//       height: '100%',
//       zIndex: -1,
//       position: 'relative',
//       marginBottom: 20
//     },
//     reCaptchaType: type.invisible
//   };

//   onShouldStartLoadWithRequest = (event: WebViewNavigation): boolean => {
//     const { config, url } = this.props;
//     if (
//       event.url === url ||
//       event.url.indexOf(RECAPTCHA_SUB_STR) !== -1 ||
//       (!!config && event.url.indexOf(config.authDomain) !== -1) ||
//       event.url.indexOf(RECAPTCHA_SUB_STR_FRAME) !== -1
//     ) {
//       return true;
//     }
//     Linking.canOpenURL(event.url).then(supported => {
//       if (!supported) {
//         console.log("Can't handle url: " + url);
//       } else {
//         return Linking.openURL(event.url);
//       }
//     });
//     return false;
//   };

//   onNavigationStateChange = (event: WebViewNavigation) => {
//     if (Platform.OS === 'android') {
//       const { url } = this.props;
//       if (
//         url !== event.url &&
//         event.url.indexOf(RECAPTCHA_SUB_STR) === -1 &&
//         !!event.canGoBack &&
//         !event.loading
//       ) {
//         Linking.canOpenURL(event.url).then(supported => {
//           if (!supported) {
//             console.log("Can't handle url: " + url);
//           } else {
//             return Linking.openURL(event.url);
//           }
//         });
//       }

//       if (!!event.canGoBack && this.webview.current) {
//         this.webview.current.goBack();
//       }
//     }
//   };

//   genSource = () => {
//     const { siteKey, action, onReady, config, reCaptchaType, url } = this.props;

//     ({
//       html:
//         reCaptchaType == type.invisible
//           ? getInvisibleRecaptchaContent(siteKey, action, onReady)
//           : getNormalRecaptchaContent(config),
//       baseUrl: url
//     });
//   };

//   render() {
//     const { containerStyle, onExecute } = this.props;

//     return (
//       <MessageWebView
//         ref={this.webview}
//         scalesPageToFit={true}
//         mixedContentMode={'always'}
//         containerStyle={containerStyle}
//         onMessage={onExecute}
//         source={this.genSource}
//         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
//         onNavigationStateChange={this.onNavigationStateChange}
//       />
//     );
//   }
// }

import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { dims } from '../../constants';

export default class ReCaptcha extends React.PureComponent<any, any> {
  getWebviewContent() {
    var originalForm =
      '<!DOCTYPE html><html><head><script src="https://www.google.com/recaptcha/api.js"></script></head><body><form action="[POST_URL]" method="post"><input type="hidden" value="[TITLE]"><input type="hidden" value="[DESCRIPTION]"><input type="hidden" value="127.0.0.1"><div class="g-recaptcha" data-sitekey="localhost"></div><input type="submit" value="Send"/></form></body></html>';
    var tmp = originalForm
      .replace('[POST_URL]', 'http://localhost:3000/v1/video')
      .replace('[TITLE]', ' this.state.form.title')
      .replace('[DESCRIPTION]', 'this.state.form.description')
      .replace('[URL]', 'this.state.form.url');

    return tmp;
  }
  render() {
    return (
      <View style={this.props.style}>
        <WebView
          javaScriptEnabled={true}
          mixedContentMode={'always'}
          style={{ width: dims.screenWidth, backgroundColor: 'red' }}
          source={{
            html: this.getWebviewContent()
          }}
        />
      </View>
    );
  }
}
