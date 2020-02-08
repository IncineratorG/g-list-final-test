/* Главный экран приложения.
Здесь происходит загрузка списка списков покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список списков покупок).
* */

// import React, {useState, useCallback} from 'react';
// import {useFocusEffect} from 'react-navigation-hooks';
// import {View, StyleSheet} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {AddButton} from '../../components/common/AddButton';
// import {EmptyMainScreen} from '../../components/main-screen/EmptyMainScreen';
// import {ListOfShoppingLists} from '../../components/main-screen/ListOfShoppingLists';
// import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';
// import {
//   loadAllShoppingLists,
//   loadShoppingList,
//   removeShoppingList,
// } from '../../store/actions/shoppingListActions';
// import LinearGradient from 'react-native-linear-gradient';
//
// const MainScreen = ({navigation}) => {
//   const {navigate} = navigation;
//
//   const [
//     removeConfirmationDialogVisible,
//     setRemoveConfirmationDialogVisible,
//   ] = useState(false);
//   const [removeItemName, setRemoveItemName] = useState('');
//   const [removeItemId, setRemoveItemId] = useState(-1);
//   const [listItemRow, setListItemRow] = useState(null);
//
//   const dispatch = useDispatch();
//
//   const shoppingListsLoading = useSelector(
//     state => state.shoppingList.allShoppingLists.loading,
//   );
//   const shoppingLists = useSelector(
//     state => state.shoppingList.allShoppingLists.data,
//   );
//   shoppingLists.sort((s1, s2) => s2.updateTimestamp > s1.updateTimestamp);
//
//   const listItemPressHandler = listItemId => {
//     dispatch(loadShoppingList(listItemId));
//     navigate('ShoppingList');
//   };
//
//   const listItemRemoveHandler = (listItem, row) => {
//     setRemoveItemName(listItem.listName);
//     setRemoveItemId(listItem.id);
//     setListItemRow(row);
//     setRemoveConfirmationDialogVisible(true);
//   };
//
//   useFocusEffect(
//     useCallback(() => {
//       dispatch(loadAllShoppingLists());
//     }, [dispatch]),
//   );
//
//   const removeConfirmationDialog = (
//     <ConfirmDialog
//       title="Удаление списка"
//       message={'Удалить список ' + removeItemName + '?'}
//       visible={removeConfirmationDialogVisible}
//       onTouchOutside={() => setRemoveConfirmationDialogVisible(false)}
//       positiveButton={{
//         title: 'Удалить',
//         titleStyle: {color: 'red'},
//         onPress: () => {
//           dispatch(removeShoppingList(removeItemId));
//           setRemoveConfirmationDialogVisible(false);
//           setListItemRow(null);
//         },
//       }}
//       negativeButton={{
//         title: 'Нет',
//         titleStyle: {color: 'grey'},
//         onPress: () => {
//           setRemoveConfirmationDialogVisible(false);
//           listItemRow.closeRow();
//           setListItemRow(null);
//         },
//       }}
//     />
//   );
//
//   const bottomGradientComponent = (
//     <LinearGradient
//       style={styles.bottomGradient}
//       colors={[
//         'rgba(255, 255, 255, 0.0)',
//         'rgba(255, 255, 255, 0.5)',
//         'rgba(255, 255, 255, 1.0)',
//       ]}
//     />
//   );
//
//   const loadingComponent = (
//     <View style={[styles.mainContainer, {backgroundColor: 'transparent'}]} />
//   );
//
//   const emptyMainScreenComponent = (
//     <View style={styles.emptyMainScreenContent}>
//       <EmptyMainScreen />
//     </View>
//   );
//
//   const listOfShoppingListsComponent = (
//     <View style={styles.listOfShoppingListContainer}>
//       <ListOfShoppingLists
//         list={shoppingLists}
//         onItemPress={listItemPressHandler}
//         onRemovePress={listItemRemoveHandler}
//       />
//     </View>
//   );
//
//   const mainScreenContent = shoppingListsLoading
//     ? loadingComponent
//     : shoppingLists.length > 0
//     ? listOfShoppingListsComponent
//     : emptyMainScreenComponent;
//
//   return (
//     <View style={styles.mainContainer}>
//       {mainScreenContent}
//       {removeConfirmationDialog}
//       <View
//         style={styles.addShoppingListButtonContainer}
//         enabled={false}
//         behavior={'position'}>
//         <AddButton
//           style={styles.addShoppingListButton}
//           onClick={() => {
//             navigate('CreateShoppingList');
//           }}
//         />
//       </View>
//       {bottomGradientComponent}
//     </View>
//   );
// };
//
// MainScreen.navigationOptions = ({navigation}) => ({
//   headerTitle: 'Списки покупок',
// });
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#edeef1',
//   },
//   addShoppingListButton: {},
//   addShoppingListButtonContainer: {
//     position: 'absolute',
//     bottom: 0,
//     marginBottom: 10,
//     zIndex: 10,
//   },
//   emptyMainScreenContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 83,
//   },
//   listOfShoppingListContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     marginLeft: 8,
//     marginRight: 8,
//   },
//   bottomGradient: {
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 90,
//     position: 'absolute',
//   },
// });
//
// export default MainScreen;
