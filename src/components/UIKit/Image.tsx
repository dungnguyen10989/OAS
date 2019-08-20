import * as React from 'react';
import { Dimensions, Image, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import PhotoView from 'react-native-photo-view';
import Text from './Text';
import View from './View';
import { dims } from '../../constants';
import VectorIcons from './VectorIcons';
import { _ImageProps } from 'ui-kit';

const { width: _width } = Dimensions.get('window');

export default class CustomImage extends React.PureComponent<_ImageProps, any> {
  static defaultProps = {
    zoomable: false,
    errorText: 'Could not load image.',
    loadingColor: 'gray',
    loadingSize: 'small'
  };

  state = {
    width: 0,
    height: 0,
    uri: '',
    modalVisible: false
  };

  componentDidMount() {
    const { source } = this.props;
    const resolver = Image.resolveAssetSource(source);
    const { width, height, uri } = resolver;
    if (width && height) {
      this.setState({ width, height, uri });
    } else {
      Image.getSize(uri, (w, h) => this.onGetSizeSuccess(w, h, uri), this.onGetSizeError);
    }
  }

  private toggleModal = (status: boolean) => {
    const { modalVisible } = this.state;
    if (modalVisible !== status) {
      this.setState({ modalVisible: status });
    }
  };

  private onGetSizeSuccess = (width: number, height: number, uri: string): void => {
    this.setState({ width, height, uri });
  };

  private onGetSizeError = (): void => {
    this.setState({ width: -1, height: -1 });
  };

  render() {
    const { width, height, uri, modalVisible } = this.state;
    const { zoomable, source, style, errorText, loadingColor, loadingSize } = this.props;

    if (width < 0) {
      return (
        <View
          flexDirection="row"
          style={{
            padding: 20,
            alignSelf: 'center',
            margin: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'silver',
            borderWidth: 1
          }}
        >
          <Ionicons name="ios-warning" style={{ marginRight: 10 }} color="silver" size={30} />
          <Text color="silver">{errorText}</Text>
        </View>
      );
    }

    if (width === 0) {
      return (
        <ActivityIndicator style={{ marginVertical: 10 }} size={loadingSize} color={loadingColor} />
      );
    }

    const ratio = height / width;

    return (
      <View>
        <TouchableOpacity
          activeOpacity={zoomable ? 0.8 : 1}
          onPress={this.toggleModal.bind(this, true)}
        >
          <Image style={[{ width, height }, style]} source={{ uri }} />
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          animationType="fade"
          hardwareAccelerated
          onRequestClose={this.toggleModal.bind(this, false)}
          supportedOrientations={[
            'landscape',
            'landscape-left',
            'landscape-right',
            'portrait',
            'portrait-upside-down'
          ]}
        >
          <View
            style={{
              width: dims.screenWidth,
              height: dims.screenHeight,
              flexDirection: 'column',
              paddingVertical: '10%',
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <VectorIcons
              touchableStyle={{ position: 'absolute', top: 30, right: 30, zIndex: 1 }}
              provider="Feather"
              color="#fff"
              name="x"
              size={30}
              onPress={this.toggleModal.bind(this, false)}
            />
            <Image
              source={source}
              // minimumZoomScale={1}
              // maximumZoomScale={3}
              // androidScaleType="center"
              onLoad={() => console.log('Image loaded!')}
              style={{
                width: _width,
                height: _width * ratio,
                top: dims.screenHeight / 2 - (_width * ratio) / 2
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
