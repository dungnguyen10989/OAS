import * as React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';

import { _ButtonProps } from 'ui-kit';
import Text from './Text';

interface Props extends _ButtonProps, TouchableOpacityProps {
  children?: JSX.Element;
}

const Wrapper: React.FunctionComponent<Props> = (props: Props) => {
  const onPress = (event: GestureResponderEvent) => {
    const { loading, pressOnLoading, onPress } = props;

    if (onPress && typeof onPress === 'function' && (!loading || pressOnLoading)) {
      onPress(event);
    }
  };

  const { backgroundColor, gradientDirection, style, children, ...rest } = props;

  return Array.isArray(backgroundColor) ? (
    <TouchableOpacity {...rest} onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={gradientDirection === 'horizontal' ? { x: 1, y: 0 } : { x: 0, y: 1 }}
        colors={backgroundColor}
        style={[styles.touchable, style]}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      style={[styles.touchable, style, { backgroundColor }]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default class Button extends React.PureComponent<_ButtonProps & TouchableOpacityProps, any> {
  static defaultProps = {
    activeOpacity: 0.6,
    title: 'Button',
    textColor: '#fff',
    loading: false,
    showLoading: true,
    pressOnLoading: false,
    spinnerColor: '#fff',
    spinnerSize: 20,
    spinnerType: 'CircleFlip',
    gradientDirection: 'horizontal'
  };

  render() {
    const {
      textStyle,
      textColor,
      textFontSize,
      backgroundColor,
      style,
      loading,
      showLoading,
      title,
      spinnerColor,
      spinnerSize,
      spinnerType,
      ...rest
    } = this.props;

    return (
      <Wrapper {...this.props}>
        {title && typeof title === 'string' ? (
          <Text
            fontSize={textFontSize}
            color={loading ? 'transparent' : textColor}
            style={textStyle}
          >
            {title}
          </Text>
        ) : (
          title
        )}
        {showLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator color={loading ? spinnerColor : 'transparent'} />
          </View>
        ) : null}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    position: 'absolute'
  }
});
