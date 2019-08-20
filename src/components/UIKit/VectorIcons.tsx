import * as React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { _VectorIconProps } from 'ui-kit';

import View from './View';

export default class VectorIcons extends React.PureComponent<_VectorIconProps> {
  static defaultProps = {
    provider: 'Ionicons',
    name: 'ios-search',
    color: '#333'
  };

  private genProvider = () => {
    const { provider } = this.props;
    switch (provider) {
      case 'Entypo':
        return Entypo;
      case 'EvilsIcons':
        return EvilIcons;
      case 'Feather':
        return Feather;
      case 'FontAwesome':
        return FontAwesome;
      case 'Foundation':
        return Foundation;
      case 'SimpleLineIcons':
        return SimpleLineIcons;
      case 'MaterialIcons':
        return MaterialIcons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      case 'Octicons':
        return Octicons;
      case 'Zocial':
        return Zocial;
      default:
        return Ionicons;
    }
  };

  private _onPress = (event: GestureResponderEvent) => {
    const { onPress } = this.props;
    if (onPress && typeof onPress === 'function') {
      onPress(event);
    }
  };

  render() {
    const Icon = this.genProvider();

    const { onPress, iconStyle, touchableStyle, name, color, size, ...rest } = this.props;

    if (!onPress || typeof onPress !== 'function') {
      return (
        <View style={[{ alignSelf: 'center' }, touchableStyle]}>
          <Icon style={iconStyle} name={name} color={color} size={size} />
        </View>
      );
    }
    return (
      <TouchableOpacity {...rest} style={touchableStyle} onPress={this._onPress}>
        <Icon style={iconStyle} name={name} color={color} size={size} />
      </TouchableOpacity>
    );
  }
}
