import * as React from 'react';
import { Modal, TouchableWithoutFeedbackProps } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { _ModalProps } from 'ui-kit';
import { dims } from '../../constants/index';

interface State {
  visible: boolean;
}

type Props = _ModalProps & TouchableWithoutFeedbackProps;

export default class ModalExtended extends React.PureComponent<Props, State> {
  static defaultProps = {
    transparent: true,
    animationType: 'slide',
    presentationStyle: 'overFullScreen'
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  public show = () => {
    const { visible } = this.state;
    if (visible !== true) {
      this.setState({ visible: true });
    }
  };

  public hide = async () => {
    const { visible } = this.state;
    const { onDismiss } = this.props;
    if (visible !== true) {
      return;
    }

    await this.setState({
      visible: false
    });

    // every platforms except ios will handle block below
    // only ios platform will invoke onDismiss function below
    if (typeof onDismiss === 'function' && dims.OS !== 'ios') {
      onDismiss();
    }
  };

  // only ios platform invoke this function
  private onDismiss = () => {
    const { onDismiss } = this.props;
    if (typeof onDismiss === 'function' && dims.OS === 'ios') {
      onDismiss();
    }
  };

  // Android, Platform.isTVOS invoke this function
  private onRequestClose = () => {
    const { backHardwareToDismiss } = this.props;
    if (backHardwareToDismiss === true) {
      this.hide();
    }
  };

  render() {
    const { visible } = this.state;
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
      backdropTouchToDismiss,
      ...rest
    } = this.props;
    return (
      <Modal
        visible={visible}
        onDismiss={this.onDismiss}
        onRequestClose={this.onRequestClose}
        supportedOrientations={supportedOrientations}
        onShow={onShow}
        transparent={transparent}
        animationType={animationType}
        hardwareAccelerated={hardwareAccelerated}
        onOrientationChange={onOrientationChange}
        presentationStyle={presentationStyle}
        animated={animated}
      >
        {backdropTouchToDismiss ? (
          <TouchableWithoutFeedback {...rest} onPress={this.hide}>
            {children}
          </TouchableWithoutFeedback>
        ) : (
          children
        )}
      </Modal>
    );
  }
}
