import * as React from 'react';
import DatePicker from 'react-native-date-picker';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

import Modal from './Modal';
import { View } from '.';
import { dims, colors } from '../../constants';

const duration = 1000;

interface Props {
  locale: string;
  onSelected?: (date: Date) => any;
  onCancel?: () => any;
}

interface State {
  date: Date;
  anim: string;
}

export default class Picker extends React.PureComponent<Props, State> {
  private modal = React.createRef<Modal>();

  state = {
    date: new Date(),
    anim: 'bounceInUp'
  };

  public show = async () => {
    await this.setState({ anim: 'bounceInUp' });
    if (this.modal.current) {
      this.modal.current.show();
    }
  };

  public hide = async () => {
    if (this.modal.current) {
      this.modal.current.hide();
    }
  };

  private onDone = () => {
    this.hide();
    if (typeof this.props.onSelected === 'function') {
      this.props.onSelected(this.state.date);
    }
  };

  private onCancel = () => {
    this.hide();
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel();
    }
  };

  private setDate = (date: Date) => this.setState({ date });

  render() {
    return (
      <Modal ref={this.modal} animationType="slide">
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.onCancel} activeOpacity={0.8}>
                <Material name="close" size={32} color={colors.main.red} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDone} activeOpacity={0.8}>
                <Material name="check" size={32} color={colors.button} />
              </TouchableOpacity>
            </View>
            <DatePicker
              locale={this.props.locale}
              date={this.state.date}
              onDateChange={this.setDate}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column-reverse',
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-start'
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingBottom: dims.getBottomSpace(),
    alignItems: 'center'
  },
  buttons: {
    backgroundColor: '#eee',
    padding: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: dims.DEFAULT_PADDING,
    borderTopRightRadius: dims.DEFAULT_PADDING / 2
  },
  button: {}
});
