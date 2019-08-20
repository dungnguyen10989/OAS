import * as React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

import { _ModalProps } from 'ui-kit';
import { dims, colors } from '../../constants/index';

interface Props {
  visible: boolean;
  backgroundColor?: string;
  indicatorColor?: string;
  indicatorSize?: number | 'large' | 'small';
}

export default class ModalExtended extends React.PureComponent<Props, any> {
  static defaultProps = {
    backgroundColor: colors.overlay,
    indicatorColor: '#fff',
    indicatorSize: 'large'
  };

  onRequestClose = () => {};

  render() {
    const { visible, backgroundColor, indicatorColor, indicatorSize } = this.props;

    return (
      <Modal
        visible={visible}
        onRequestClose={this.onRequestClose}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right'
        ]}
        transparent
        animationType="fade"
        hardwareAccelerated
      >
        <View style={[styles.wrapper, { backgroundColor }]}>
          <ActivityIndicator color={indicatorColor} size={indicatorSize} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
