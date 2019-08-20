import * as React from 'react';
import { Text, TextStyle } from 'react-native';
import { dims, colors } from '../../constants';
import normalize from '../../utils/normalize';

const generateSize = (props: any) => {
  const { fontSize, style } = props;
  const _fontSize = style && style.fontSize ? style.fontSize : undefined;

  if (!fontSize && !_fontSize) {
    return normalize(dims.fontSize.medium);
  }
  if (typeof fontSize === 'number') {
    return normalize(fontSize);
  }
  if (typeof fontSize === 'string' && dims.fontSize[fontSize]) {
    return normalize(dims.fontSize[fontSize]);
  }
  return normalize(_fontSize);
};

const generateColor = (props: any) => {
  const { color, style } = props;

  const _color = style && style.color ? style.color : colors.text;
  const result = color || _color;

  return result;
};

const generateStyle = (props: any) => {
  const { fontStyle, fontWeight, textAlign, textTransform, fontFamily } = props;

  const fontSize = generateSize(props);
  const color = generateColor(props);

  const lineHeight = fontSize * 1.2;

  const style: TextStyle = { fontSize, color };

  if (fontStyle) {
    style.fontStyle;
  }
  if (fontWeight) {
    style.fontWeight = fontWeight;
  }
  if (textAlign) {
    style.textAlign = textAlign;
  }
  if (textTransform) {
    style.textTransform = textTransform;
  }
  if (fontFamily) {
    style.fontFamily = fontFamily;
  }

  return style;
};

export { generateSize, generateColor, generateStyle };
