import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Modalize from 'react-native-modalize';

interface Props {
  onClose?: Function;
  onClosed?: Function;
}

export default class AbsoluteHeader extends React.PureComponent<Props> {
  private readonly modal = React.createRef<Modalize>();

  renderHeader = () => (
    <TouchableOpacity
      style={s.modal__header}
      activeOpacity={0.8}
      onPress={this.closeModal}
      hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
    >
      <Image
        source={{ uri: 'https://flaticons.net/gd/makefg.php?i=icons/Mobile%20Application/Close.png&r=255&g=255&b=255' }}
        style={{ width: '40%', height: '40%' }}
      />
    </TouchableOpacity>
  );

  renderContent = () => (
    <View style={s.content}>
      <Text style={s.content__heading}>Article title</Text>
      <Text style={s.content__subheading}>November 11st 2018</Text>
    </View>
  );

  onClosed = () => {
    const modal = this.modal.current;

    if (modal) {
      modal.close();
    }
  };

  openModal = () => {
    const modal = this.modal.current;

    if (modal) {
      modal.open();
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };

  render() {
    return (
      <Modalize
        ref={this.modal}
        // HeaderComponent={this.renderHeader}
        // withHandle={false}
        // onClosed={this.onClosed}
      >
        {/* {this.renderContent()} */}
      </Modalize>
    );
  }
}

const s = StyleSheet.create({
  modal__header: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,

    alignItems: 'center',
    justifyContent: 'center',

    width: 25,
    height: 25,

    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4
  },

  content: {
    padding: 15
  },

  content__heading: {
    marginBottom: 2,

    fontSize: 24,
    fontWeight: '600',
    color: '#333'
  },

  content__subheading: {
    marginBottom: 20,

    fontSize: 16,
    color: '#ccc'
  },

  content__paragraph: {
    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: '#666'
  }
});
