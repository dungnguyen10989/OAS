import * as React from 'react';
import { t } from '../../i18n';
import { _NavigationProps } from 'ui-kit';
import { dims, colors } from '../../constants';
import { UIKit } from '../../components';
import { StyleSheet } from 'react-native';

interface Props {
  onSearch: (text?: string) => void;
  visible?: boolean;
}

interface State {
  text: string;
}

export default class SearchBar extends React.Component<Props, State> {
  state = {
    text: ''
  };

  onPress = () => {
    const { onSearch } = this.props;
    if (typeof onSearch === 'function' && this.state.text) {
      onSearch(this.state.text);
    }
  };

  onChangeText = (text: string) => {
    this.setState({ text });
    const { onSearch } = this.props;
    if (!text && typeof onSearch === 'function') {
      onSearch('');
    }
  };

  render() {
    const { text } = this.state;
    const { visible } = this.props;

    return (
      <UIKit.View style={styles.wrapper}>
        <UIKit.Core.TextInput
          style={[styles.input, !visible && { backgroundColor: 'silver' }]}
          underlineColorAndroid="transparent"
          autoCapitalize="sentences"
          autoCorrect={false}
          spellCheck={false}
          clearButtonMode="never"
          placeholder={t('pHolder.searchRequest')}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onPress}
          returnKeyType="search"
          value={text}
          editable={visible}
        />

        <UIKit.Core.TouchableOpacity style={styles.x} onPress={this.onPress} activeOpacity={0.8}>
          <UIKit.assets.icons.Feather.Search width={16} height={16} stroke="gray" />
        </UIKit.Core.TouchableOpacity>
      </UIKit.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    width: dims.screenWidth - 110,
    height: '100%'
  },
  x: {
    position: 'absolute',
    right: 10
  },
  input: {
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 30,
    borderRadius: 20,
    backgroundColor: '#fff'
  }
});
