import React, { Component } from 'react';
import {
  Animated,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  PanResponder,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Easing,
  GestureResponderEvent,
  PanResponderGestureState
} from 'react-native';
import {  } from 'react-native-camera-kit';
import { dims } from '../constants';
import { Header } from 'react-navigation';
import Boundary from './Boundary';
import { IContainerProps } from 'ui-kit';

const data = [1, 2, 3, 4];

const NAVBAR_HEIGHT = 190;
const STATUS_BAR_HEIGHT = dims.getStatusBarHeight();
const TOOLBAR_HEIGHT = Header.HEIGHT;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'lightblue'
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT
  },
  contentContainer: {
    flex: 1
  },
  contentContainer2: {
    flex: 1,
    paddingTop: NAVBAR_HEIGHT
  },
  title: {
    color: '#333333'
  },
  row: {
    height: 300,
    width: undefined,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent'
  },
  rowText: {
    color: 'white',
    fontSize: 18
  }
});

export default class Home extends React.PureComponent<IContainerProps, any> {
  static navigationOptions = { header: null };

  private scrollRef = React.createRef<ScrollView>();
  private scrollAnim = new Animated.Value(0);
  private startResponder = 0;

  handleRelease = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    console.log('release', evt, this.startResponder);

    const y = evt.nativeEvent.locationY;
    const direction = y > this.startResponder ? 1 : 0;
    const toValue = direction === 0 ? NAVBAR_HEIGHT - STATUS_BAR_HEIGHT : 0;

    Animated.spring(this.scrollAnim, {
      toValue,
      useNativeDriver: true
    }).start();

    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTo({ y: toValue, animated: true });
    }
  };

  private _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => (this.startResponder = evt.nativeEvent.locationY),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: this.handleRelease,
    onPanResponderTerminate: this.handleRelease
  });

  _renderRow(rowData: any, rowId: number) {
    return <View style={{ height: 300, backgroundColor: 'aqua', marginBottom: 20 }} />;
  }

  render() {
    const navbarTranslate = this.scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -NAVBAR_HEIGHT + TOOLBAR_HEIGHT + STATUS_BAR_HEIGHT],
      extrapolate: 'clamp'
    });
    const navbarOpacity = this.scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const navbarOpacity2 = this.scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <Boundary navigation={this.props.navigation}>
        <View style={styles.fill}>
          <View style={styles.contentContainer}>
            <ScrollView
              {...this._panResponder.panHandlers}
              accessible
              ref={this.scrollRef}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: this.scrollAnim } } }
              ])}
              contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
            >
              {data.map((item, index) => this._renderRow(item, index))}
            </ScrollView>
          </View>
          <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
            <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>PLACES</Animated.Text>
            <Animated.Text style={[styles.title, { opacity: navbarOpacity2 }]}>
              ABCDEF
            </Animated.Text>
          </Animated.View>
        </View>
      </Boundary>
    );
  }
}

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   PanResponder,
//   PanResponderInstance,
//   GestureResponderEvent,
//   PanResponderGestureState,
//   Animated
// } from 'react-native';

// import { ScrollView } from 'react-native-gesture-handler';

// var CIRCLE_SIZE = 80;

// // A clone of: https://github.com/facebook/react-native/blob/master/RNTester/js/PanResponderExample.js
// export default class PanResponderExample extends Component {
//   private circle = React.createRef<View>();

//   componentDidMount() {
//     this._updateNativeStyles();
//   }

//   _highlight = () => {
//     this._circleStyles.style.backgroundColor = 'blue';
//     this._updateNativeStyles();
//   };

//   _unHighlight = () => {
//     this._circleStyles.style.backgroundColor = 'green';
//     this._updateNativeStyles();
//   };

//   _updateNativeStyles = () => {
//     if (this.circle.current) {
//       this.circle.current.setNativeProps(this._circleStyles);
//     }
//   };

//   _handlePanResponderMove = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
//     this._circleStyles.style.left = this._previousLeft + gestureState.dx;
//     this._circleStyles.style.top = this._previousTop + gestureState.dy;
//     this._updateNativeStyles();
//   };

//   _handlePanResponderEnd = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
//     console.log('release');

//     this._unHighlight();
//     this._previousLeft += gestureState.dx;
//     this._previousTop += gestureState.dy;
//   };

//   private _panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: this._highlight,
//     onPanResponderMove: this._handlePanResponderMove,
//     onPanResponderRelease: this._handlePanResponderEnd,
//     onPanResponderTerminate: this._handlePanResponderEnd
//   });
//   private _previousLeft = 20;
//   private _previousTop = 84;
//   private _circleStyles = {
//     style: {
//       left: this._previousLeft,
//       top: this._previousTop,
//       backgroundColor: 'green'
//     }
//   };

//   render() {
//     return (
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <Animated.View
//           {...this._panResponder.panHandlers}
//           style={{ flex: 1, backgroundColor: 'lightyellow' }}
//         >
//           {[1, 2, 3].map((i: any) => (
//             <View style={{ height: 400, backgroundColor: 'aqua', marginBottom: 10 }} key={`${i}`} />
//           ))}
//         </Animated.View>
//       </ScrollView>
//     );
//   }
// }

// // export default class Example extends Component {
// //   _onClick = () => {
// //     alert("I'm so touched");
// //   };
// //   render() {
// //     return (
// //       <ScrollView
// //         waitFor={['dragbox', 'image_pinch', 'image_rotation', 'image_tilt']}
// //         style={styles.scrollView}
// //       >
// //         <View style={{ height: 400, backgroundColor: 'aqua' }} />
// //         <PanResponderExample />
// //         <View style={{ height: 400, backgroundColor: 'aqua' }} />
// //       </ScrollView>
// //     );
// //   }
// // }

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#F5FCFF'
//   },
//   circle: {
//     width: CIRCLE_SIZE,
//     height: CIRCLE_SIZE,
//     borderRadius: CIRCLE_SIZE / 2,
//     zIndex: 100
//   }
// });
