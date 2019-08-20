// import * as React from 'react';
// import { Animated, StyleSheet, View } from 'react-native';
// import { RectButton } from 'react-native-gesture-handler';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import * as Animatable from 'react-native-animatable';

// import { EventEmitter, emitter, events } from '../../../emitter';
// import Text from '../Text';

// interface Action {
//   content: string;
//   onPress?: () => any | undefined;
//   executeImmediately?: boolean | undefined;
// }

// interface Props {
//   listId: string;
//   data?: any;
//   index: number;
//   isDeleted?: boolean;
//   inAnimation?: string;
//   outAnimation?: string;
//   easing?: any;
//   animation?: string;
//   duration?: number;
//   rightActions?: Array<Action>;
// }

// interface State {
//   isVisible?: boolean;
//   isVisibleView?: boolean;
// }

// export default class SwipeItem extends React.PureComponent<Props, State> {
//   private _swipeRow = React.createRef<Swipeable>();
//   private _event: any;
//   private _animatedRef = React.createRef<View>();
//   private _callbackOnClosed: () => any | undefined;

//   static defaultProps = {
//     inAnimation: 'fadeIn',
//     outAnimation: 'fadeOut',
//     easing: null,
//     animation: null,
//     duration: 300
//   };

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       isVisible: true,
//       isVisibleView: true
//     };
//     this._callbackOnClosed = () => {};
//   }

//   componentWillMount() {
//     this._event = emitter.addListener(
//       events.onSwipeItemOpened,
//       (listId: string, activeIndex?: number) => {
//         if (listId !== this.props.listId) {
//           return;
//         }
//         if (activeIndex !== this.props.index || activeIndex === -1) {
//           this._swipeRow.close();
//         }
//       }
//     );
//   }

//   componentWillUnmount() {
//     this._event.remove();
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.isDeleted !== this.props.isDeleted) {
//       this.setState({ isVisible: nextProps.isDeleted === true ? false : true });
//       this._animatedRef.startAnimation();
//     }
//   }

//   private renderRightAction = (
//     action: Action,
//     color: string,
//     x: number,
//     progress: Animated.Value
//   ) => {
//     const trans = progress.interpolate({
//       inputRange: [0, 1],
//       outputRange: [x, 0]
//     });
//     const { content, executeImmediately, onPress } = action;

//     const pressHandler = async () => {
//       this._swipeRow.close();

//       if (!onPress || typeof onPress !== 'function') {
//         return;
//       }

//       if (executeImmediately) {
//         onPress();
//       } else {
//         this._callbackOnClosed = onPress;
//       }
//     };

//     return (
//       <Animated.View key={`${x}`} style={{ flex: 1, transform: [{ translateX: trans }] }}>
//         <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
//           <Text>{content}</Text>
//         </RectButton>
//       </Animated.View>
//     );
//   };

//   private renderRightActions = (progress: Animated.Value) => {
//     const rightActions = this.props.rightActions || [];
//     const len = rightActions.length;
//     return (
//       <View style={{ width: len * 64, flexDirection: 'row' }}>
//         {rightActions.map((i, index) => {
//           const color = index === 0 ? '#C8C7CD' : index === 1 ? '#fab00' : '#dd2c00';
//           return this.renderRightAction(i, color, 64 * (len - index), progress);
//         })}
//       </View>
//     );
//   };

//   private onWillOpen = () => {
//     const { index, listId } = this.props;
//     emitter.emit(events.onSwipeItemOpened, listId, index);
//   };

//   private animationEnded = () => {
//     const { isVisible } = this.state;
//     if (!isVisible) {
//       this.setState({ isVisibleView: false });
//     }
//   };

//   private onClosed = () => {
//     const callback = this._callbackOnClosed;
//     if (callback && typeof callback === 'function') {
//       this._callbackOnClosed();
//     }
//   };

//   render() {
//     const { children, inAnimation, outAnimation, easing, animation, duration } = this.props;
//     const { isVisible, isVisibleView } = this.state;

//     if (!isVisibleView) {
//       return null;
//     }

//     let animationType = isVisible ? inAnimation : outAnimation;

//     if (animation) {
//       animationType = animation;
//     }

//     return (
//       <Animatable.View
//         ref={this._animatedRef}
//         easing={easing}
//         animation={animationType}
//         onAnimationEnd={this.animationEnded}
//         duration={duration}
//       >
//         <Swipeable
//           ref={this._swipeRow}
//           friction={1}
//           renderRightActions={this.renderRightActions}
//           onSwipeableWillOpen={this.onWillOpen}
//           onSwipeableClose={this.onClosed}
//         >
//           {children}
//         </Swipeable>
//       </Animatable.View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   leftAction: {
//     flex: 1,
//     backgroundColor: '#497AFC',
//     justifyContent: 'center'
//   },
//   actionText: {
//     color: 'white',
//     backgroundColor: 'transparent',
//     padding: 10
//   },
//   rightAction: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center'
//   }
// });

import * as React from 'react';

import { View } from 'react-native';

export default () => {
  return <View />;
};
