import * as React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import { _InputProps } from 'ui-kit';
import { dims, colors } from '../../constants/index';
import Text from './Text';
import { generateStyle, generateSize, generateColor } from './Helper';
import { icons as Icons } from '../../assets';

export default class Input extends React.PureComponent<_InputProps, any> {
  static defaultProps = {
    border: true,
    underlineColorAndroid: 'transparent',
    autoCapitalize: 'sentences',
    autoCorrect: false,
    spellCheck: false,
    iconClearColor: 'silver',
    showClearButton: true,
    color: colors.text,
    borderBottomColor: 'silver',
    showError: true,
    errorColor: 'red',
    errorFontSize: dims.fontSize.smaller
  };

  private input = React.createRef<TextInput>();

  public focus = () => {
    if (this.input.current) {
      this.input.current.focus();
    }
  };

  private _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { setFieldTouched, id, onBlur, values } = this.props;

    setFieldTouched(`${id}`);

    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  private _clear = () => {
    const { setFieldValue, id } = this.props;
    setFieldValue(id, '');
    this.focus();
  };

  render() {
    const {
      iconClearSize,
      iconClearColor,
      showClearButton,
      borderBottomColor,
      containerStyle,
      style,
      values,
      touched,
      errors,
      handleChange,
      id,
      selectionColor,
      showError,
      lineStyle,
      border,
      errorColor,
      placeholder,
      errorFontSize,
      ...rest
    } = this.props;

    const value = values[id];

    const _size = generateSize(this.props);
    const _color = generateColor(this.props);
    const _style = generateStyle(this.props);

    return (
      <View style={[styles.line, containerStyle]}>
        <View
          style={[styles.inputWrapper, { borderBottomWidth: border ? 0.5 : 0, borderBottomColor }]}
        >
          <TextInput
            {...rest}
            ref={this.input}
            onChangeText={handleChange(`${id}`)}
            selectionColor={selectionColor || _color}
            value={value}
            style={[styles.input, style, _style]}
            clearButtonMode="never"
            onBlur={this._onBlur}
            placeholder={placeholder}
          />
          {value && value.length > 0 && showClearButton ? (
            <Icons.Feather.X
              width={_size}
              height={_size}
              stroke={iconClearColor || colors.text}
              onPress={this._clear}
            />
          ) : null}
        </View>
        {showError ? (
          <Text
            style={styles.error}
            color={touched[id] && errors[id] ? errorColor : 'transparent'}
            fontSize={errorFontSize}
          >
            {touched[id] && errors[id] ? errors[id] : 'error'}
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#fff'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomColor: colors.border,
    padding: 0,
    paddingBottom: 3
  },
  placeholder: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: -1,
    color: 'gray',
    margin: 0,
    padding: 0
  },
  input: {
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'center',
    padding: 0,
    margin: 0
  },
  clear: {
    padding: 5
  },
  error: {
    marginTop: 3,
    marginBottom: 3
  }
});
