import React from 'react';
import _ from 'lodash';
import { Animated, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';

import { UIKit } from '..';
import { t } from '../../i18n';
import { colors, dims, business } from '../../constants';

const btnWidth = 100;

export interface Props {
  type: 'my-approved' | 'all';
  data: any;
  isOpen?: boolean;
  setActivateIndex?: () => void;
  onPress?: (item: any) => void;
  goToApprove?: () => void;
  goToView?: () => void;
}
export default class RowWrapper extends React.Component<Props, any> {
  private rowRef = React.createRef<Swipeable>();

  shouldComponentUpdate(nextProps: Props) {
    const { data, type, isOpen } = nextProps;
    const { data: _data, type: _type, isOpen: _isOpen } = this.props;

    if (_isOpen && !isOpen && this.rowRef.current) {
      this.rowRef.current.close();
    }

    if (_.isEqual(data, _data) || type === _type || isOpen === _isOpen) {
      return false;
    }
    return true;
  }

  onOpen = () => {
    if (typeof this.props.setActivateIndex === 'function') {
      this.props.setActivateIndex();
    }
  };

  close = () => {
    if (this.rowRef.current) {
      this.rowRef.current.close();
    }
  };

  renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.Value | Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });
    const pressHandler = () => {
      this.close();
      if (x === 2 * btnWidth && typeof this.props.goToApprove === 'function') {
        this.props.goToApprove();
      } else if (x === 3 * btnWidth && typeof this.props.goToView === 'function') {
        this.props.goToView();
      }
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
          <UIKit.Text
            numberOfLines={2}
            color="#fff"
            fontSize={dims.fontSize.small}
            textAlign="center"
          >
            {text}
          </UIKit.Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = (progress: Animated.Value | Animated.AnimatedInterpolation) => {
    if (this.props.data.status === 'Opening') {
      return (
        <View style={{ width: btnWidth * 2, flexDirection: 'row' }}>
          {this.renderRightAction(t('btn.editRequest'), '#dd2c00', btnWidth * 2, progress)}
          {this.renderRightAction(t('btn.close'), '#C8C7CD', btnWidth, progress)}
        </View>
      );
    }
    return (
      <View style={{ width: btnWidth * 3, flexDirection: 'row' }}>
        {this.renderRightAction(t('btn.approvalHistory'), '#ffab00', btnWidth * 3, progress)}
        {this.renderRightAction(t('btn.quickApprove'), '#dd2c00', btnWidth * 2, progress)}
        {this.renderRightAction(t('btn.close'), '#C8C7CD', btnWidth, progress)}
      </View>
    );
  };

  generateBackground = (status: string, overDeadline: boolean | undefined) => {
    if (overDeadline) {
      return '#fff';
    }
    const index = business.STATUS.findIndex(i => i === status);
    return business.COLORS_STATUS[index];
  };

  renderContent = () => {
    const { data, onPress } = this.props;
    const {
      id,
      code,
      name,
      type,
      status,
      deadline,
      isOverDeadline,
      unitCode,
      createdBy,
      createdDate
    } = data;

    return (
      <UIKit.Core.TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          backgroundColor: deadline ? colors.status.overDeadline : '#fff',
          padding: 10,
          borderRadius: 5
        }}
      >
        <UIKit.Text fontWeight="bold" color={deadline ? '#fff' : colors.text}>
          {unitCode + ' - ' + type}
        </UIKit.Text>

        <UIKit.Text
          numberOfLines={2}
          color={deadline ? '#fff' : colors.text}
          fontSize={dims.fontSize.small}
        >
          {name}
        </UIKit.Text>
        <UIKit.Text fontSize={dims.fontSize.small} color={deadline ? '#fff' : colors.text}>
          {code}
        </UIKit.Text>
        <UIKit.Text fontSize={dims.fontSize.small} color={deadline ? '#ccc' : '#555'}>
          {createdBy}
        </UIKit.Text>
        <UIKit.View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <UIKit.Text
            numberOfLines={1}
            fontSize={dims.fontSize.smaller}
            style={{ flex: 1 }}
            color={deadline ? '#ccc' : '#555'}
          >
            {createdDate
              ? moment(createdDate)
                  .toDate()
                  .toLocaleDateString()
              : ''}
          </UIKit.Text>
          <UIKit.View
            style={[
              styles.statusWrapper,
              { backgroundColor: this.generateBackground(status, isOverDeadline) }
            ]}
          >
            <UIKit.Text
              fontSize={dims.fontSize.smaller}
              color={deadline ? colors.status.overDeadline : '#fff'}
            >
              {status}
            </UIKit.Text>
          </UIKit.View>
        </UIKit.View>
      </UIKit.Core.TouchableOpacity>
    );
  };

  render() {
    const { type } = this.props;

    if (type === 'my-approved') {
      return this.renderContent();
    }

    return (
      <Swipeable
        ref={this.rowRef}
        friction={1}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        onSwipeableWillOpen={this.onOpen}
        overshootFriction={1}
      >
        {this.renderContent()}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center'
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  statusWrapper: {
    borderRadius: 13,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 8
  }
});
