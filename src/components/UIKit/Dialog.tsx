import * as React from 'react';
import { Modal, ModalProps, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { dims, colors } from '../../constants/index';
import View from './View';
import Text from './Text';
import { t } from '../../i18n';
import { emitter, events, EventSubscription, AlertParams } from '../../emitter';

const duration = 300;
interface State extends AlertParams {
  visible?: boolean;
  onDismissed?: () => void;
  animation?: string;
}

export default class Dialog extends React.PureComponent<ModalProps, State> {
  static defaultProps = {
    transparent: true,
    animationType: 'none',
    presentationStyle: 'overFullScreen'
  };

  private event: EventSubscription;
  private stackEvents = new Array<AlertParams>();

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      visible: false,
      title: '',
      content: '',
      buttons: [{ text: 'Ok' }],
      onDismissed: () => {},
      animation: undefined
    };

    this.event = emitter.addListener(events.alert, this.onEvent);
  }

  componentWillUnmount() {
    if (this.event) {
      this.event.remove();
    }
  }

  renderItem = (item: { text: string; onPress: () => void }, i: number) => {
    const _onPress = async () => {
      await this.setState({ onDismissed: item.onPress });
      this.hide();
    };
    return (
      <TouchableOpacity key={`${i}`} onPress={_onPress} style={styles.btn}>
        <Text style={styles.btnText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  onEvent = (params: AlertParams) => {
    if (!this.state.visible) {
      this.setState({ ...params, visible: true, animation: 'zoomIn' });
    } else {
      this.stackEvents.push(params);
    }
  };

  handleNextEvents = () => {
    const params = this.stackEvents.pop();
    if (params) {
      emitter.emit(events.alert, params);
    }
  };

  public readonly hide = async () => {
    await this.setState({ animation: 'zoomOut' });
    setTimeout(async () => {
      await this.setState({ visible: false });
      const { onDismissed } = this.state;
      if (dims.OS === 'android' && typeof onDismissed === 'function') {
        onDismissed();
      }
      this.handleNextEvents();
    }, duration);
  };

  // only ios platform invokes this function
  private onDismiss = () => {
    const { onDismissed } = this.state;
    if (dims.OS === 'ios' && typeof onDismissed === 'function') {
      onDismissed();
    }
    this.handleNextEvents();
  };

  render() {
    const {
      supportedOrientations,
      onShow,
      transparent,
      animationType,
      hardwareAccelerated,
      onOrientationChange,
      presentationStyle,
      animated,
      children,
      ...rest
    } = this.props;
    const { visible, content, buttons, title, animation } = this.state;
    return (
      <Modal
        {...rest}
        transparent
        visible={visible}
        onDismiss={this.onDismiss}
        onRequestClose={undefined}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right'
        ]}
      >
        <View style={styles.wrapper}>
          <Animatable.View animation={animation} duration={duration} style={styles.content}>
            <Text style={styles.title}>{title ? title.toUpperCase() : t('alert.alert')}</Text>
            <View style={styles.center}>
              {typeof content === 'string' ? (
                <Text style={styles.text}>{content}</Text>
              ) : typeof content === 'function' ? (
                content()
              ) : null}
            </View>
            <View style={styles.list}>
              {buttons.map((b: any, i: number) => this.renderItem(b, i))}
            </View>
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: dims.DEFAULT_PADDING,
    paddingVertical: 100
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  center: {
    borderColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: dims.DEFAULT_PADDING,
    paddingTop: dims.DEFAULT_PADDING / 2,
    paddingHorizontal: dims.DEFAULT_PADDING
  },
  text: {
    textAlign: 'center'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  btnText: {
    color: colors.button
  },
  list: {
    flexDirection: 'row'
  }
});
