// // import { Platform } from 'react-native';

// // import {
// //   setCustomView,
// //   setCustomTextInput,
// //   setCustomText,
// //   setCustomImage,
// //   setCustomTouchableOpacity
// // } from 'react-native-global-props';

// // const customTextInputProps = {
// //   underlineColorAndroid: 'rgba(0,0,0,0)',
// //   style: {
// //     borderWidth: 1,
// //     borderColor: 'gray',
// //     color: '#a1a1a1',
// //     paddingVertical: 5,
// //     paddingHorizontal: 10,
// //     backgroundColor: 'white'
// //   }
// // };

// // // Setting default styles for all Text components.
// // const customTextProps = {
// //   style: {
// //     fontSize: 16,
// //     // fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
// //     color: '#a1a1a1'
// //   }
// // };

// // const customImageProps = {
// //   resizeMode: 'cover'
// // };

// // // Adds a bigger hit box for all TouchableOpacity's.
// // const customTouchableOpacityProps = {
// //   hitSlop: { top: 15, right: 15, left: 15, bottom: 15 }
// // };

// // setCustomTextInput(customTextInputProps);
// // setCustomText(customTextProps);
// // setCustomImage(customImageProps);
// // setCustomTouchableOpacity(customTouchableOpacityProps);

// import * as React from 'react';
// import { Text, TextInput } from 'react-native';

// import { dims, colors } from '../constants';
// import normalize from './normalize';

// generateSize = props => {
//   const { fontSize, style } = props;
//   const _fontSize = style && style.fontSize ? style.fontSize : undefined;

//   if (!fontSize && !_fontSize) {
//     return normalize(dims.fontSize.medium);
//   }
//   if (typeof fontSize === 'number') {
//     return normalize(fontSize);
//   }
//   if (typeof fontSize === 'string' && dims.fontSize[fontSize]) {
//     return normalize(dims.fontSize[fontSize]);
//   }
//   return normalize(_fontSize);
// };

// generateColor = props => {
//   const { color, style } = props;
//   const _color = style && style.color ? style.color : colors.text;
//   const result = color || _color;

//   return result;
// };

// generateStyle = props => {
//   const { fontStyle, fontWeight, textAlign, textTransform, fontFamily } = props;

//   const fontSize = generateSize(props);
//   const color = generateColor(props);

//   const lineHeight = fontSize * 1.2;

//   return {
//     fontSize,
//     color,
//     lineHeight,
//     height: lineHeight,
//     fontWeight,
//     textAlign,
//     fontStyle,
//     textTransform,
//     fontFamily
//   };
// };

// const overrideRenderText = () => {
//   const TextRender = Text.render;

//   Text.render = function render(props) {
//     let oldProps = props;
//     props = { ...props, style: [props.style, generateStyle(props)] };
//     try {
//       return TextRender.apply(this, arguments);
//     } finally {
//       props = oldProps;
//     }
//   };
// };

// const overrideRenderInput = () => {
//   const TextInputRender = TextInput.render;

//   TextInput.render = function render(props) {
//     let oldProps = props;
//     props = { ...props, style: [props.style, generateStyle(props)] };

//     try {
//       return TextInputRender.apply(this, arguments);
//     } finally {
//       props = oldProps;
//     }
//   };
// };

// overrideRenderText();
// overrideRenderInput();
