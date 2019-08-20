import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Boundary from './Boundary';
import { _NavigationProps } from 'ui-kit';

export default class Profile extends React.Component<_NavigationProps, any> {
  render() {
    const { navigation } = this.props;
    return (
      <Boundary>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text>Profile Screen</Text>
        </View>
      </Boundary>
    );
  }
}
