import * as React from 'react';
import { TouchableOpacityProps, ViewStyle, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { _ButtonProps } from 'ui-kit';
import Button from './Button';

interface Props {
  colors: string[];
  linearStyle?: ViewStyle;
  direction?: 'vertical' | 'horizontal';
}

export default class GradientButton extends React.PureComponent<
  TouchableOpacityProps & _ButtonProps & Props,
  any
> {
  static defaultProps = {
    colors: ['#ff9b44', '#fc6075'],
    direction: 'horizontal'
  };

  render() {
    const { children, colors, linearStyle, direction, ...rest } = this.props;
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={direction === 'horizontal' ? { x: 1, y: 0 } : { x: 0, y: 1 }}
        colors={colors}
        style={[styles.btn, linearStyle]}
      >
        <Button {...rest} backgroundColor="transparent" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
