import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modalize from 'react-native-modalize';
import { t } from '../../i18n';
import { Formik, FormikActions, FormikValues } from 'formik';

import { UIKit } from '../../components';

interface Props {
  data: any[];
  onClosed: (item: any) => void;
}

export default class SelectGroup extends React.PureComponent<Props, any> {
  static defaultProps = {
    data: [
      { id: 1, name: 'Group BBBBBBB' },
      { id: 2, name: 'Group ABBBBBB' },
      { id: 3, name: 'Group AABBBBB' },
      { id: 4, name: 'Group AAABBBB' },
      { id: 5, name: 'Group AAAABBB' },
      { id: 6, name: 'Group AAAAABB' },
      { id: 7, name: 'Group AAAAAAB' },
      { id: 8, name: 'Group AAAAAAA' }
    ],
    onClosed: (item: any) => {}
  };

  private formik = React.createRef<Formik>();
  private modalRef = React.createRef<Modalize>();

  onSubmit = () => {};

  onItemPress = (item: any) => {
    if (this.modalRef.current) {
      this.modalRef.current.close();
      this.props.onClosed(item);
    }
  };

  open = () => {
    if (this.modalRef.current) {
      this.modalRef.current.open();
    }
  };

  renderItem = ({ item }: { item: any }) => {
    return (
      <UIKit.Core.TouchableOpacity style={styles.item} onPress={this.onItemPress.bind(this, item)}>
        <UIKit.Text>{item.name}</UIKit.Text>
      </UIKit.Core.TouchableOpacity>
    );
  };

  renderSeparator = () => <UIKit.View style={styles.separator} />;

  render() {
    return (
      <Modalize useNativeDriver withReactModal withHandle ref={this.modalRef}>
        <Formik
          ref={this.formik}
          enableReinitialize
          initialValues={{ approve: '', note: '', requestType: '' }}
          onSubmit={this.onSubmit}
        >
          {props => {
            const _data = this.props.data.filter((i: any) => i.name.includes(props.values.note));
            return (
              <React.Fragment>
                <UIKit.Input
                  {...props}
                  id="note"
                  placeholder="search group"
                  style={styles.input}
                  containerStyle={styles.inputWrapper}
                />
                {_data.length === 0 ? (
                  <UIKit.Text textAlign="center">{t('label.noData')}</UIKit.Text>
                ) : (
                  <UIKit.FlatList
                    data={_data}
                    keyExtractor={item => `${item.id}`}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                  />
                )}
              </React.Fragment>
            );
          }}
        </Formik>
      </Modalize>
    );
  }
}

const styles = UIKit.Core.StyleSheet.create({
  wrapper: {},
  item: {
    padding: 10
  },
  inputWrapper: {
    paddingHorizontal: 10
  },
  input: {
    paddingVertical: 10,
    paddingLeft: 5
  },
  separator: {
    height: 2
  }
});
