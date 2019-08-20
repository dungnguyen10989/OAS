import * as React from 'react';
import { View as RNView, StyleProp, ViewStyle } from 'react-native';
import { _ViewProps } from 'ui-kit';

export default class View extends React.PureComponent<_ViewProps, any> {
  render() {
    const {
      flex,
      flexDirection,
      alignItems,
      justifyContent,
      flexWrap,
      alignContent,
      position,
      children,
      ...rest
    } = this.props;

    const style: any = this.props;

    const styles: StyleProp<ViewStyle> = {
      flex: flex || style.flex,
      flexDirection: flexDirection || style.flexDirection,
      alignItems: alignItems || style.alignItems,
      justifyContent: justifyContent || style.justifyContent,
      flexWrap: flexWrap || style.flexWrap,
      alignContent: alignContent || style.alignContent,
      position: position || style.position,
      ...rest
    };

    return (
      <RNView style={[style, styles]} {...rest}>
        {children}
      </RNView>
    );
  }
}
