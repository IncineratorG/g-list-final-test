import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EmptyShoppingListScreen} from '../../../components/shopping-list-screen/EmptyShoppingListScreen';
import {ProductsList} from '../../../components/shopping-list-screen/ProductsList';
import ProductInputArea from '../../../components/shopping-list-screen/input-area/ProductInputArea';
import {AddButton} from '../../../components/common/AddButton';
import ConfirmDialog from 'react-native-simple-dialogs/src/ConfirmDialog';
import BusyIndicator from '../../../components/main-screen/BusyIndicator';
import {ProductCategoriesList} from '../../../components/shopping-list-screen/ProductCategoriesList';

const ShoppingListView = ({styles, model, controller}) => {
  const {
    inputAreaVisible,
    inputAreaEditMode,
    inputAreaEditModeData,
    listLoading,
    products,
    units,
    unitsMap,
    classes,
    classesMap,
    editable,
    removeProductName,
    removeConfirmationDialogVisible,
    sharedListLoading,
    usedProductsClasses,
    selectedProductClass,
    online,
    shared,
  } = model;

  const {
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    productRemoveHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogCancelRemoveHandler,
    shadedBackgroundPressHandler,
    selectCategoryHandler,
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
        onItemPress={productPressHandler}
        onStatusPress={statusPressHandler}
        onRemovePress={productRemoveHandler}
        unitsMap={unitsMap}
        classesMap={classesMap}
        selectedCategory={selectedProductClass}
      />
    </View>
  );

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
        editMode={inputAreaEditMode}
        editModeData={inputAreaEditModeData}
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

  const addButtonComponent = (
    <AddButton
      style={[styles.addShoppingListItemButton, {zIndex: 20}]}
      onClick={addProductButtonHandler}
    />
  );
  // const addButtonComponent = editable ? (
  //   <AddButton
  //     style={[styles.addShoppingListItemButton, {zIndex: 20}]}
  //     onClick={addProductButtonHandler}
  //   />
  // ) : null;

  const loadingIndicatorComponent = (
    <View style={styles.loadingIndicatorContainer}>
      <BusyIndicator busy={sharedListLoading} />
    </View>
  );

  const productCategoriesComponent = (
    <View style={styles.productCategoriesContainer}>
      <ProductCategoriesList
        categories={usedProductsClasses}
        onCategoryPress={selectCategoryHandler}
        selectedCategory={selectedProductClass}
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {loadingIndicatorComponent}
      {productCategoriesComponent}
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
