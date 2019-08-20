import _ from 'lodash';
import * as React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { _CheckboxProps } from 'ui-kit';

import { icons as Icons, icons } from '../../assets';
import View from './View';
import VectorIcons from './VectorIcons';
import Text from './Text';
import { colors, dims } from '../../constants';
import normalize from '../../utils/normalize';

interface ICheckboxState {
  checked: Array<any>;
}

const ICON_SIZE = normalize(14);

export default class Checkbox extends React.PureComponent<_CheckboxProps, ICheckboxState> {
  static defaultProps = {
    data: [],
    initChecked: [],
    onChanged: () => {},
    renderItem: () => <View />,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    provider: 'Feather',
    iconsSize: ICON_SIZE,
    checkedIconName: 'check-square',
    unCheckedIconName: 'square',
    activeOpacity: 0.8,
    checkedIconColor: '#333',
    unCheckedIconColor: 'gray',
    checkedTextColor: '#333',
    unCheckedTextColor: 'gray'
  };

  constructor(props: _CheckboxProps) {
    super(props);
    const { initChecked } = this.props;
    const checked = Array.isArray(initChecked) ? initChecked : [];
    this.state = { checked };
  }

  public getChecked = (): Array<any> => {
    const { checked } = this.state;
    return checked;
  };

  private onPress = (item: any): void => {
    const { onChanged } = this.props;
    const { checked } = this.state;

    const isChecked = checked.some(i => _.isEqual(i, item));

    if (isChecked) {
      _.remove(checked, i => _.isEqual(i, item));
    } else {
      checked.push(item);
    }
    if (typeof onChanged === 'function') {
      onChanged(checked);
    }

    this.setState({ checked });
  };

  private renderItem = ({ item }: { item: any }): JSX.Element => {
    const {
      provider,
      checkedIconName,
      unCheckedIconName,
      checkedIconColor,
      unCheckedIconColor,
      checkedTextColor,
      unCheckedTextColor,
      iconsSize,
      containerStyle,
      textStyle,
      textFontSize,
      ...rest
    } = this.props;
    const { checked } = this.state;

    const isChecked = checked.some(i => _.isEqual(i, item));

    const Icon = isChecked ? Icons.Feather.CheckSquare : Icons.Feather.Square;
    const name = isChecked ? checkedIconName : unCheckedIconName;
    const iconColor = isChecked ? checkedIconColor : unCheckedIconColor;
    const textColor = isChecked ? checkedTextColor : unCheckedTextColor;

    return (
      <TouchableOpacity
        {...rest}
        style={Object.assign({}, styles.wrapper, containerStyle)}
        onPress={this.onPress.bind(this, item)}
      >
        <Icon width={iconsSize} height={iconsSize} stroke={iconColor} />
        <Text fontSize={textFontSize} color={textColor} style={textStyle}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  private generateKeyExtractor = (item: any, index: number) => {
    const { keyExtractor } = this.props;
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    return `key-${index}`;
  };

  render() {
    const { data, ...rest } = this.props;

    return (
      <FlatList
        {...rest}
        style={styles.list}
        data={data}
        extraData={this.state}
        keyExtractor={this.generateKeyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.border,
    borderBottomWidth: dims.borderWidth
  },
  list: {
    width: '100%'
  }
});
