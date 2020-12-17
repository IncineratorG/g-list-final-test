import React from 'react';
import {View} from 'react-native';
import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';
import LinearGradient from 'react-native-linear-gradient';
import {EmptyMainScreen} from '../../../components/specific/main-screen/EmptyMainScreen';
import {ListOfShoppingLists} from '../../../components/specific/main-screen/ListOfShoppingLists';
import {AddButton} from '../../../components/common/AddButton';
import {ListTypesList} from '../../../components/specific/main-screen/ListTypesList';
import BusyIndicator from '../../../components/specific/main-screen/BusyIndicator';
import {LoadingMainScreen} from '../../../components/specific/main-screen/LoadingMainScreen';

const MainView = ({styles, model, controller}) => {
  const {
    removeConfirmationDialogVisible,
    removeItemName,
    currentEmail,
    listTypes,
    selectedListType,
    selectedShoppingLists,
    busy,
    online,
    listsLoading,
  } = model;

  const {
    listItemPressHandler,
    listItemRemoveHandler,
    addButtonHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    selectListTypeHandler,
    shareListHandler,
  } = controller;

  const removeConfirmationDialog = (
    <ConfirmDialog
      title="Удаление списка"
      message={'Удалить список ' + removeItemName + '?'}
      visible={removeConfirmationDialogVisible}
      onTouchOutside={removeConfirmationDialogTouchOutsideHandler}
      positiveButton={{
        title: 'Удалить',
        titleStyle: {color: 'red'},
        onPress: removeConfirmationDialogRemoveHandler,
      }}
      negativeButton={{
        title: 'Нет',
        titleStyle: {color: 'grey'},
        onPress: removeConfirmationDialogCancelRemoveHandler,
      }}
    />
  );

  const bottomGradientComponent = (
    <LinearGradient
      style={styles.bottomGradient}
      colors={[
        'rgba(255, 255, 255, 0.0)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(255, 255, 255, 1.0)',
      ]}
    />
  );

  const emptyMainScreenComponent = (
    <View style={styles.emptyMainScreenContent}>
      <EmptyMainScreen />
    </View>
  );

  const listOfShoppingListsComponent = (
    <View style={styles.listOfShoppingListContainer}>
      <ListOfShoppingLists
        online={online}
        currentEmail={currentEmail}
        list={selectedShoppingLists}
        sectionList={[]}
        onItemPress={listItemPressHandler}
        onRemovePress={listItemRemoveHandler}
        onSharePress={shareListHandler}
      />
    </View>
  );

  const listTypesComponent = (
    <View style={styles.listTypesContainer}>
      <ListTypesList
        types={listTypes}
        selectedListType={selectedListType}
        onSelectListType={selectListTypeHandler}
      />
    </View>
  );
  // const listTypesComponent = listTypes.length ? (
  //   <View style={styles.listTypesContainer}>
  //     <ListTypesList
  //       types={listTypes}
  //       selectedListType={selectedListType}
  //       onSelectListType={selectListTypeHandler}
  //     />
  //   </View>
  // ) : null;

  const loadingIndicatorComponent = (
    <View style={styles.loadingIndicatorContainer}>
      <BusyIndicator busy={busy} />
    </View>
  );

  const mainScreenContent = selectedShoppingLists.length
    ? listOfShoppingListsComponent
    : emptyMainScreenComponent;
  // const mainScreenContent = listOfShoppingListsComponent;
  // const mainScreenContent = shoppingListsLoading
  //   ? loadingComponent
  //   : shoppingLists.length > 0
  //   ? listOfShoppingListsComponent
  //   : emptyMainScreenComponent;

  const listLoadedComponent = (
    <View style={styles.mainContainer}>
      {loadingIndicatorComponent}
      {listTypesComponent}
      {mainScreenContent}
      {removeConfirmationDialog}
      <View
        style={styles.addShoppingListButtonContainer}
        enabled={false}
        behavior={'position'}>
        <AddButton
          style={styles.addShoppingListButton}
          onClick={addButtonHandler}
        />
      </View>
      {bottomGradientComponent}
    </View>
  );

  const listLoadingComponent = (
    <View style={styles.loadingComponentContainer}>
      <LoadingMainScreen />
    </View>
  );

  const activeComponent =
    listsLoading && !selectedShoppingLists.length
      ? listLoadingComponent
      : listLoadedComponent;

  return activeComponent;

  // return (
  //   <View style={styles.mainContainer}>
  //     {loadingIndicatorComponent}
  //     {listTypesComponent}
  //     {mainScreenContent}
  //     {removeConfirmationDialog}
  //     <View
  //       style={styles.addShoppingListButtonContainer}
  //       enabled={false}
  //       behavior={'position'}>
  //       <AddButton
  //         style={styles.addShoppingListButton}
  //         onClick={addButtonHandler}
  //       />
  //     </View>
  //     {bottomGradientComponent}
  //   </View>
  // );
};

export default MainView;

// const MainView = ({styles, model, controller}) => {
//   const {
//     removeConfirmationDialogVisible,
//     removeItemName,
//     shoppingLists,
//     shoppingListsLoading,
//     sharedListsLoading,
//   } = model;
//
//   const {
//     listItemPressHandler,
//     listItemRemoveHandler,
//     addButtonHandler,
//     removeConfirmationDialogTouchOutsideHandler,
//     removeConfirmationDialogRemoveHandler,
//     removeConfirmationDialogCancelRemoveHandler,
//   } = controller;
//
//   const removeConfirmationDialog = (
//     <ConfirmDialog
//       title="Удаление списка"
//       message={'Удалить список ' + removeItemName + '?'}
//       visible={removeConfirmationDialogVisible}
//       onTouchOutside={removeConfirmationDialogTouchOutsideHandler}
//       positiveButton={{
//         title: 'Удалить',
//         titleStyle: {color: 'red'},
//         onPress: removeConfirmationDialogRemoveHandler,
//       }}
//       negativeButton={{
//         title: 'Нет',
//         titleStyle: {color: 'grey'},
//         onPress: removeConfirmationDialogCancelRemoveHandler,
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
//     // eslint-disable-next-line react-native/no-inline-styles
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
//         list={[]}
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
//   // ===
//   const sharedListsLoadingComponent = (
//     <View style={{height: 20, width: 200, backgroundColor: 'green'}} />
//   );
//   const sharedListsLoadedComponent = (
//     <View style={{height: 20, width: 200, backgroundColor: 'grey'}} />
//   );
//   const sharedListsLoadingStatusComponent = sharedListsLoading
//     ? sharedListsLoadingComponent
//     : sharedListsLoadedComponent;
//   // ===
//
//   return (
//     <View style={styles.mainContainer}>
//       {sharedListsLoadingStatusComponent}
//       {mainScreenContent}
//       {removeConfirmationDialog}
//       <View
//         style={styles.addShoppingListButtonContainer}
//         enabled={false}
//         behavior={'position'}>
//         <AddButton
//           style={styles.addShoppingListButton}
//           onClick={addButtonHandler}
//         />
//       </View>
//       {bottomGradientComponent}
//     </View>
//   );
// };
//
// export default MainView;
