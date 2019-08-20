import * as React from 'react';
import { View, TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native';

import { styles } from '../../utils/navigationServices';

interface Props {
  wrapper?: 'view' | undefined;
  opacity?: number;
  style?: ViewStyle;
  onPress?: (e: GestureResponderEvent) => any;
}

export default class HeaderButton extends React.PureComponent<Props, any> {
  static defaultProps = {
    wrapper: 'touch',
    opacity: 0.7
  };

  render() {
    const { wrapper, children, opacity, style, onPress } = this.props;

    if (wrapper === 'view') {
      return <View style={[styles.btn, style]}>{children}</View>;
    }

    return (
      <TouchableOpacity onPress={onPress} style={[styles.btn, style]} activeOpacity={opacity}>
        {children}
      </TouchableOpacity>
    );
  }
}
