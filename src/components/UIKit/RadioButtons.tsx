import _ from 'lodash';
import * as React from 'react';
import { _RadiosProps } from 'ui-kit';
import { FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { icons as Icons } from '../../assets';
import View from './View';
import VectorIcons from './VectorIcons';
import Text from './Text';
import { colors, dims } from '../../constants';
import normalize from '../../utils/normalize';

interface IRadioState {
  checked: any;
}

const ICON_SIZE = normalize(14);

export default class Checkbox extends React.PureComponent<_RadiosProps, IRadioState> {
  static defaultProps = {
    onChanged: () => {},
    renderItem: () => <View />,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    provider: 'Ionicons',
    iconsSize: ICON_SIZE,
    checkedIconName: `${dims.prefix}radio-button-on`,
    unCheckedIconName: `${dims.prefix}radio-button-off`,
    activeOpacity: 0.8,
    checkedIconColor: colors.text,
    unCheckedIconColor: '#a1a1a1',
    checkedTextColor: colors.text,
    unCheckedTextColor: '#a1a1a1'
  };

  constructor(props: _RadiosProps) {
    super(props);
    const { initChecked, data } = this.props;

    this.state = { checked: initChecked };
  }

  public getChecked = (): any => {
    const { checked } = this.state;
    return checked;
  };

  private onPress = (item: any): void => {
    const { onChanged } = this.props;
    this.setState({ checked: item.item });
    if (typeof onChanged === 'function') {
      onChanged(item.item, item.index);
    }
  };

  private renderItem = (item: any): JSX.Element => {
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
      reverse,
      initChecked,
      renderItem: _renderItem,
      ...rest
    } = this.props;

    const { checked } = this.state;

    const isChecked = _.isEqual(checked, item.item);

    const Icon = isChecked ? Icons.Ionicons.RadioOn : Icons.Ionicons.RadioOff;
    const iconColor = isChecked ? checkedIconColor : unCheckedIconColor;
    const textColor = isChecked ? checkedTextColor : unCheckedTextColor;

    return (
      <TouchableOpacity
        {...rest}
        style={[styles.wrapper, containerStyle, { flexDirection: reverse ? 'row-reverse' : 'row' }]}
        onPress={() => this.onPress(item)}
      >
        <Icon width={iconsSize} height={iconsSize} stroke={iconColor} />
        {typeof _renderItem === 'function' ? (
          _renderItem(item)
        ) : (
          <Text fontSize={textFontSize} color={textColor} style={textStyle}>
            {item.item}
          </Text>
        )}
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

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const { data, ...rest } = this.props;

    return (
      <FlatList
        {...rest}
        style={{ width: '100%' }}
        data={data}
        extraData={this.state}
        keyExtractor={this.generateKeyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});
