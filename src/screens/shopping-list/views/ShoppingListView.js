import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EmptyShoppingListScreen} from '../../../components/shopping-list-screen/EmptyShoppingListScreen';
import {ProductsList} from '../../../components/shopping-list-screen/ProductsList';
import ProductInputArea from '../../../components/shopping-list-screen/input-area/ProductInputArea';
import {AddButton} from '../../../components/common/AddButton';
import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';

const ShoppingListView = ({styles, model, controller}) => {
  const {
    inputAreaVisible,
    listLoading,
    products,
    units,
    classes,
    editable,
    removeProductName,
    removeConfirmationDialogVisible,
    sharedListLoading,
  } = model;

  const {
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productRemoveHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    shadedBackgroundPressHandler,
  } = controller;

  const removeConfirmationDialog = (
    <ConfirmDialog
      title="Удаление продукта"
      message={'Удалить ' + removeProductName + '?'}
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

  const loadingComponent = (
    <View style={[styles.mainContainer, {backgroundColor: 'transparent'}]} />
  );

  const emptyShoppingListScreenComponent = (
    <View style={styles.emptyShoppingListScreenContent}>
      <EmptyShoppingListScreen />
    </View>
  );

  const shoppingListComponent = (
    <View style={styles.shoppingListContainer}>
      <ProductsList
        editable={editable}
        list={products}
        onStatusPress={statusPressHandler}
        onRemovePress={productRemoveHandler}
        units={units}
        classes={classes}
      />
    </View>
  );

  // const shadedBackgroundComponent = inputAreaVisible ? (
  //   <View style={styles.shadedBackground} />
  // ) : null;
  const shadedBackgroundComponent = inputAreaVisible ? (
    <TouchableWithoutFeedback
      onPress={shadedBackgroundPressHandler}
      behavior={'position'}>
      <View style={styles.shadedBackground} />
    </TouchableWithoutFeedback>
  ) : null;

  const inputAreaComponent = inputAreaVisible ? (
    <View style={styles.inputAreaContainer}>
      <ProductInputArea
        onInputAreaHide={inputAreaHideHandler}
        onSubmitValues={inputAreaSubmitValuesHandler}
        units={units}
        classes={classes}
      />
    </View>
  ) : null;

  const shoppingListScreenContent = listLoading
    ? loadingComponent
    : products.length > 0
    ? shoppingListComponent
    : emptyShoppingListScreenComponent;

  const addButtonComponent = editable ? (
    <AddButton
      style={[styles.addShoppingListItemButton, {zIndex: 20}]}
      onClick={addProductButtonHandler}
    />
  ) : null;

  // ===
  const sharedListLoadingComponent = (
    <View style={{height: 20, width: 200, backgroundColor: 'green'}} />
  );
  const sharedListLoadedComponent = (
    <View style={{height: 20, width: 200, backgroundColor: 'grey'}} />
  );
  const sharedListLoadingStatusComponent = sharedListLoading
    ? sharedListLoadingComponent
    : sharedListLoadedComponent;
  // ===

  return (
    <View style={styles.mainContainer}>
      {sharedListLoadingStatusComponent}
      {shoppingListScreenContent}
      {removeConfirmationDialog}
      <View style={styles.addShoppingListItemButtonContainer}>
        {addButtonComponent}
      </View>
      {inputAreaComponent}
      {shadedBackgroundComponent}
      {bottomGradientComponent}
    </View>
  );
};

export default ShoppingListView;
