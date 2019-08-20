import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import VectorIcons from 'react-native-vector-icons/Ionicons';

import Text from './Text';
import { dims } from '../../constants';
import { t } from '../../i18n';

interface Props {
  onReconnect?: Function;
}

export default class Wrapper extends React.PureComponent<Props, any> {
  render = () => {
    const { onReconnect } = this.props;
    const connect = typeof onReconnect === 'function' ? onReconnect : () => {};
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.errorWrapper}
        onPress={connect.bind(this)}
      >
        <VectorIcons color="tomato" size={40} name="ios-warning" />
        <Text style={styles.errorText}>{t('label.errorFetch')}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  errorWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: dims.DEFAULT_PADDING
  },
  errorText: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
