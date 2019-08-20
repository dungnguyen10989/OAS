// import React, { Component } from 'react';
// import { Animated, RefreshControl, View, StyleSheet, ViewStyle, FlatList } from 'react-native';
// import { Header } from 'react-navigation';

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// const data = [1, 2, 3];

// const NAVBAR_HEIGHT = Header.HEIGHT;

// interface Props {}

// interface State {
//   refreshing: boolean;
//   scrollAnim: Animated.Value;
// }

// export default class Home extends React.PureComponent<Props, State> {
//   state = {
//     refreshing: false,
//     scrollAnim: new Animated.Value(0)
//   };

//   renderItem = ({ item }: { item: any }) => {
//     <View style={{ height: 300, backgroundColor: `rgb(0,${item})00,255` }} />;
//   };
//   render() {
//     return (
//       <AnimatedFlatList
//         data={data}
//         renderItem={this.renderItem}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
//           { useNativeDriver: true }
//         )}
//         refreshControl={
//           <RefreshControl
//             refreshing={this.state.refreshing}
//             onRefresh={() => {
//               this.setState({ refreshing: true });
//               setTimeout(() => this.setState({ refreshing: false }), 1000);
//             }}
//             // Android offset for RefreshControl
//             progressViewOffset={NAVBAR_HEIGHT}
//           />
//         }
//         // iOS offset for RefreshControl
//         contentInset={{
//           top: NAVBAR_HEIGHT
//         }}
//         contentOffset={{
//           y: -NAVBAR_HEIGHT
//         }}
//       />
//     );
//   }
// }

import React, { Component } from 'react';
import { Animated, Image, Platform, StyleSheet, View, Text, FlatList } from 'react-native';

const data = [
  {
    key: 'key',
    name: 'name',
    image: 'imageUrl'
  }
];

const NAVBAR_HEIGHT = 90;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT
  },
  contentContainer: {
    flex: 1
  },
  title: {
    color: '#333333'
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent'
  },
  rowText: {
    color: 'white',
    fontSize: 18
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);

    this._clampedScrollValue = 0;
    this._offsetValue = 0;
    this._scrollValue = 0;

    this.state = {
      scrollAnim
    };
  }

  _renderRow(rowData, rowId) {
    return (
      <View style={{ flex: 1 }}>
        <Image key={rowId} style={styles.row} source={{ uri: rowData.image }} resizeMode="cover" />
        <Text style={styles.rowText}>{rowData.title}</Text>
      </View>
    );
  }

  render() {
    const { scrollAnim } = this.state;

    const navbarTranslate = scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp'
    });
    const navbarOpacity = scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.fill}>
        <View style={styles.contentContainer}>
          <FlatList
            data={data}
            renderItem={item => this._renderRow(item.item, item.index)}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }
            ])}
          />
        </View>
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <Animated.Text style={[styles.title, { opacity: navbarOpacity }]}>PLACES</Animated.Text>
        </Animated.View>
      </View>
    );
  }
}
