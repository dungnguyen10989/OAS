import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Boundary from './Boundary';
import { _NavigationProps } from 'ui-kit';

export default class Modal extends React.Component<_NavigationProps, any> {
  render() {
    const { navigation } = this.props;
    return (
      <Boundary>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.props.navigation.getParam('content')}
        </View>
      </Boundary>
    );
  }
}
