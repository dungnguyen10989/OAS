// import _ from 'lodash';
// import * as React from 'react';
// import { FlatList, FlatListProps } from 'react-native';

// import { emitter, events } from '../../../emitter';
// import SwipeableRow from './SwipeItem';

// const DATA = [1, 2, 3, 4, 5, 6];

// interface Props extends FlatListProps<any> {
//   id: string; // unique for each list
// }
// export default class SwipeableFlatList extends React.Component<Props, any> {
//   static defaultProps = {
//     data: DATA
//   };

//   close = () => {
//     emitter.emit(events.onSwipeItemOpened, this.props.id, -1);
//   };

//   render() {
//     const { id, renderItem, ...rest } = this.props;
//     return (
//       <FlatList
//         {...rest}
//         renderItem={({ item, index, separators }) => (
//           <SwipeableRow
//             listId={id}
//             index={index}
//             rightActions={[
//               {
//                 content: 'Delete',
//                 onPress: async () => {
//                   const { data } = this.state;
//                   if (data[index]) {
//                     data[index]['_isDeleted'] = true;
//                   }

//                   await this.setState({ data });
//                   _.remove(data, (_item, _index) => index === _index);
//                   this.setState({ data });
//                 }
//               },
//               {
//                 content: 'Close',
//                 executeImmediately: true
//               },
//               {
//                 content: 'More',
//                 executeImmediately: false
//               }
//             ]}
//           >
//             {renderItem({ item, index, separators })}
//           </SwipeableRow>
//         )}
//         keyExtractor={(item, index) => `${index}`}
//       />
//     );
//   }
// }

// // import * as React from 'react';
// // import { StyleSheet, View } from 'react-native';
// // import Interactable from 'react-native-interactable';

// // export default class SwipeableCard extends React.Component {
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <Interactable.View
// //           key="first"
// //           horizontalOnly={true}
// //           snapPoints={[{ x: 360 }, { x: 0, damping: 0.5 }, { x: -360 }]}
// //         >
// //           <View style={styles.card} />
// //         </Interactable.View>

// //         <Interactable.View
// //           key="second"
// //           horizontalOnly={true}
// //           snapPoints={[{ x: 360 }, { x: 0 }, { x: -360 }]}
// //         >
// //           <View style={styles.card} />
// //         </Interactable.View>

// //         <Interactable.View
// //           key="third"
// //           horizontalOnly={true}
// //           snapPoints={[{ x: 360 }, { x: 0, damping: 0.8 }, { x: -360 }]}
// //         >
// //           <View style={styles.card} />
// //         </Interactable.View>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'white'
// //   },
// //   card: {
// //     width: 300,
// //     height: 180,
// //     backgroundColor: '#32B76C',
// //     borderRadius: 8,
// //     marginVertical: 6
// //   }
// // });

import * as React from 'react';

import { View } from 'react-native';

export default () => {
  return <View />;
};
