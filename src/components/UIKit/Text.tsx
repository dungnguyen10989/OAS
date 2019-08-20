import * as React from 'react';
import { Text } from 'react-native';
import { _TextProps } from 'ui-kit';
import { generateStyle } from './Helper';

export default class CustomText extends React.PureComponent<_TextProps, any> {
  static defaultProps = {
    allowFontScaling: false
  };

  render() {
    const { children, style, ...rest } = this.props;
    const _style = generateStyle(this.props);

    return (
      <Text
        style={[style, _style, { flexWrap: 'nowrap' }]}
        {...rest}
        lineBreakMode="tail"
        ellipsizeMode="tail"
      >
        {children}
      </Text>
    );
  }
}
