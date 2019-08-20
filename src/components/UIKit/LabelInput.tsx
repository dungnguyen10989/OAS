import * as React from 'react';
import {
  TextInput,
  Platform,
  TouchableOpacity,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  LayoutChangeEvent,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _InputProps } from 'ui-kit';
import { dims } from '../../constants/index';
import Text from './Text';
import Input from './Input';

const prefix = Platform.OS === 'android' ? 'md-' : 'ios-';
interface State {
  textHeight: number;
  inputHeight: number;
}

export default class LabelInput extends React.PureComponent<_InputProps, State> {
  private input = React.createRef<TextInput>();
  private _top = new Animated.Value(0);
  private _font = new Animated.Value(0);

  state = {
    textHeight: 0,
    inputHeight: 0
  };

  onTextLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    this.setState({ textHeight: height });
  };

  onInputLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    this.setState({ textHeight: height });
  };

  render() {
    const { textHeight, inputHeight } = this.state;
    const top = this._top.interpolate({
      inputRange: [0, 1],
      outputRange: [inputHeight, 0]
    });
    const fontSize = this._font.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 10]
    });

    return (
      <View style={{ backgroundColor: 'red' }}>
        <Animated.Text
          style={{ zIndex: 0, margin: 0, padding: 0, position: 'absolute', top, fontSize }}
        >
          {this.props.placeholder}
        </Animated.Text>
        <Input
          {...this.props}
          onFocus={() => {
            Animated.parallel([
              Animated.spring(this._font, {
                toValue: 1
              }),
              Animated.timing(this._top, {
                toValue: 1
              })
            ]).start();
          }}
          onBlur={() => {
            Animated.parallel([
              Animated.spring(this._font, {
                toValue: 0
              }),
              Animated.timing(this._top, {
                toValue: 0
              })
            ]).start();
          }}
          onLayout={this.onInputLayout}
          containerStyle={{ padding: 0, margin: 0 }}
          lineStyle={{ padding: 0, margin: 0 }}
          style={{ backgroundColor: 'transparent', zIndex: 1 }}
          placeholder=""
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 7
  },
  input: {
    backgroundColor: '#fff',
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center'
  },
  clear: {
    marginLeft: 5
  },
  error: {
    marginTop: 3,
    marginBottom: 3
  }
});
