// /* Компонент, отображающий элемент списка списков покупок на стартовом экране (один список покупок).
//  * */
//
// import React from 'react';
// import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
// import {icons} from '../../assets/icons';
//
// export const ListOfShoppingListsItem = ({listItem, onItemPress}) => {
//   const listItemCompleted =
//     listItem.totalItemsCount > 0 &&
//     listItem.completedItemsCount >= listItem.totalItemsCount;
//
//   const onItemPressHandler = () => {
//     if (onItemPress) {
//       // console.log('TOTAL: ' + listItem.totalItemsCount);
//       // console.log('COMPLETED: ' + listItem.completedItemsCount);
//
//       onItemPress(listItem.id);
//     }
//   };
//
//   const completedComponent = (
//     <View style={styles.mainContainer}>
//       <View style={styles.nameContainer}>
//         <Text style={styles.nameFinished} numberOfLines={2} elipsizeMode="tail">
//           {listItem.listName}
//         </Text>
//       </View>
//       <View style={styles.statusContainer}>
//         <View style={styles.statusFinished}>
//           <Image style={styles.checmarkIcon} source={icons.checkmark} />
//         </View>
//       </View>
//     </View>
//   );
//
//   // const notCompletedComponent = (
//   //   <View style={styles.mainContainer}>
//   //     <View style={styles.nameContainer}>
//   //       <Text
//   //         style={styles.nameNotFinished}
//   //         numberOfLines={2}
//   //         elipsizeMode="tail">
//   //         {listItem.listName}
//   //       </Text>
//   //     </View>
//   //     <View style={styles.statusContainer}>
//   //       <View style={styles.statusNotFinished} />
//   //     </View>
//   //   </View>
//   // );
//
//   const notCompletedComponent = (
//     <View style={styles.mainContainer}>
//       <View style={styles.infoContainer}>
//         <View style={styles.nameContainer}>
//           <Text style={styles.nameNotFinished}>{listItem.listName}</Text>
//         </View>
//         <View style={styles.completionContainer}>
//           <Text style={styles.completionNotFinished}>
//             Куплено {listItem.completedItemsCount} из {listItem.totalItemsCount}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
//
//   const itemComponent = notCompletedComponent;
//
//   // let itemComponent =
//   //   listItem.completionStatus === SHOPPING_LIST_COMPLETED
//   //     ? completedComponent
//   //     : notCompletedComponent;
//
//   return (
//     <TouchableHighlight
//       style={styles.mainContainerTouchable}
//       onPress={onItemPressHandler}>
//       {itemComponent}
//     </TouchableHighlight>
//   );
// };
//
// const styles = StyleSheet.create({
//   infoContainer: {
//     flex: 1,
//   },
//   completionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   completionNotFinished: {
//     marginLeft: 20,
//     marginRight: 10,
//     marginTop: 7,
//     marginBottom: 7,
//     fontSize: 14,
//     color: 'grey',
//   },
//
//   mainContainer: {
//     backgroundColor: 'white',
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     borderRadius: 4,
//     flexDirection: 'row',
//     elevation: 3,
//   },
//   mainContainerTouchable: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginTop: 0,
//     // marginLeft: 7,
//     // marginRight: 7,
//     marginBottom: 7,
//     borderRadius: 7,
//     flexDirection: 'row',
//   },
//   nameContainer: {
//     // flex: 1,
//     height: 50,
//     // justifyContent: 'center',
//   },
//   nameNotFinished: {
//     marginTop: 7,
//     marginLeft: 7,
//     marginRight: 7,
//     fontSize: 18,
//     color: '#424242',
//   },
//   statusContainer: {
//     width: 50,
//     height: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'flex-start',
//   },
//   statusNotFinished: {
//     width: 30,
//     height: 30,
//     backgroundColor: 'white',
//     borderRadius: 15,
//     elevation: 6,
//     marginRight: 10,
//   },
//   statusFinished: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#41D8B1',
//     borderRadius: 15,
//     elevation: 6,
//     marginRight: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checmarkIcon: {
//     transform: [{scale: 0.7}],
//   },
//   nameFinished: {
//     marginLeft: 20,
//     marginRight: 10,
//     fontSize: 18,
//     color: '#D3D3D3',
//     textDecorationLine: 'line-through',
//   },
// });
//
// // /* Компонент, отображающий элемент списка списков покупок на стартовом экране (один список покупок).
// //  * */
// //
// // import React from 'react';
// // import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native';
// // import {icons} from '../../assets/icons';
// // import {SHOPPING_LIST_COMPLETED} from '../../services/storage/data/shoppingListStatus';
// //
// // export const ListOfShoppingListsItem = ({listItem, onItemPress}) => {
// //   const onItemPressHandler = () => {
// //     if (onItemPress) {
// //       onItemPress(listItem.id);
// //     }
// //   };
// //
// //   const completedComponent = (
// //     <View style={styles.mainContainer}>
// //       <View style={styles.nameContainer}>
// //         <Text style={styles.nameFinished} numberOfLines={2} elipsizeMode="tail">
// //           {listItem.listName}
// //         </Text>
// //       </View>
// //       <View style={styles.statusContainer}>
// //         <View style={styles.statusFinished}>
// //           <Image style={styles.checmarkIcon} source={icons.checkmark} />
// //         </View>
// //       </View>
// //     </View>
// //   );
// //
// //   const notCompletedComponent = (
// //     <View style={styles.mainContainer}>
// //       <View style={styles.nameContainer}>
// //         <Text
// //           style={styles.nameNotFinished}
// //           numberOfLines={2}
// //           elipsizeMode="tail">
// //           {listItem.listName}
// //         </Text>
// //       </View>
// //       <View style={styles.statusContainer}>
// //         <View style={styles.statusNotFinished} />
// //       </View>
// //     </View>
// //   );
// //
// //   let itemComponent =
// //     listItem.completionStatus === SHOPPING_LIST_COMPLETED
// //       ? completedComponent
// //       : notCompletedComponent;
// //
// //   return (
// //     <TouchableHighlight
// //       style={styles.mainContainerTouchable}
// //       onPress={onItemPressHandler}>
// //       {itemComponent}
// //     </TouchableHighlight>
// //   );
// // };
// //
// // const styles = StyleSheet.create({
// //   // mainContainer: {
// //   //   backgroundColor: 'white',
// //   //   flex: 1,
// //   //   justifyContent: 'flex-end',
// //   //   alignItems: 'center',
// //   //   marginTop: 7,
// //   //   marginLeft: 10,
// //   //   marginRight: 10,
// //   //   marginBottom: 10,
// //   //   borderRadius: 25,
// //   //   flexDirection: 'row',
// //   //   elevation: 3,
// //   // },
// //   mainContainer: {
// //     backgroundColor: 'white',
// //     flex: 1,
// //     justifyContent: 'flex-end',
// //     alignItems: 'center',
// //     borderRadius: 4,
// //     flexDirection: 'row',
// //     elevation: 3,
// //   },
// //   mainContainerTouchable: {
// //     flex: 1,
// //     justifyContent: 'flex-end',
// //     alignItems: 'center',
// //     marginTop: 7,
// //     // marginLeft: 7,
// //     // marginRight: 7,
// //     marginBottom: 7,
// //     borderRadius: 4,
// //     flexDirection: 'row',
// //   },
// //   nameContainer: {
// //     flex: 1,
// //   },
// //   nameNotFinished: {
// //     marginLeft: 20,
// //     marginRight: 10,
// //     fontSize: 18,
// //     color: '#424242',
// //   },
// //   statusContainer: {
// //     width: 50,
// //     height: 60,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     alignSelf: 'flex-start',
// //   },
// //   statusNotFinished: {
// //     width: 30,
// //     height: 30,
// //     backgroundColor: 'white',
// //     borderRadius: 15,
// //     elevation: 6,
// //     marginRight: 10,
// //   },
// //   statusFinished: {
// //     width: 30,
// //     height: 30,
// //     backgroundColor: '#41D8B1',
// //     borderRadius: 15,
// //     elevation: 6,
// //     marginRight: 10,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   checmarkIcon: {
// //     transform: [{scale: 0.7}],
// //   },
// //   nameFinished: {
// //     marginLeft: 20,
// //     marginRight: 10,
// //     fontSize: 18,
// //     color: '#D3D3D3',
// //     textDecorationLine: 'line-through',
// //   },
// // });
