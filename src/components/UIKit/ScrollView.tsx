import * as React from 'react';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps
} from 'react-native-keyboard-aware-scroll-view';

export default class ScrollView extends React.PureComponent<KeyboardAwareScrollViewProps> {
  static defaultProps = {
    enableResetScrollToCoords: false,
    enableAutomaticScroll: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false
  };

  render() {
    const { children, ...rest } = this.props;
    return <KeyboardAwareScrollView {...rest}>{children}</KeyboardAwareScrollView>;
  }
}
