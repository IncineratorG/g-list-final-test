import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EmptyShoppingListScreen} from '../../../components/shopping-list-screen/EmptyShoppingListScreen';
import {ProductsList} from '../../../components/shopping-list-screen/ProductsList';
import InputArea from '../../../components/shopping-list-screen/input-area/InputArea';
import {AddButton} from '../../../components/common/AddButton';

const ShoppingListView = ({styles, model, controller}) => {
  const {inputAreaVisible, listLoading, products, units} = model;

  const {
    addProductButtonHandler,
    inputAreaHideHandler,
    inputAreaSubmitValuesHandler,
    statusPressHandler,
  } = controller;

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
      <ProductsList list={products} onStatusPress={statusPressHandler} />
    </View>
  );

  const shadedBackgroundComponent = inputAreaVisible ? (
    <View style={styles.shadedBackground} />
  ) : null;

  const inputAreaComponent = inputAreaVisible ? (
    <View style={styles.inputAreaContainer}>
      <InputArea
        onInputAreaHide={inputAreaHideHandler}
        onSubmitValues={inputAreaSubmitValuesHandler}
        units={units}
      />
    </View>
  ) : null;

  const shoppingListScreenContent = listLoading
    ? loadingComponent
    : products.length > 0
    ? shoppingListComponent
    : emptyShoppingListScreenComponent;

  return (
    <View style={styles.mainContainer}>
      {shoppingListScreenContent}
      <View style={styles.addShoppingListItemButtonContainer}>
        <AddButton
          style={[styles.addShoppingListItemButton, {zIndex: 20}]}
          onClick={addProductButtonHandler}
        />
      </View>
      {inputAreaComponent}
      {shadedBackgroundComponent}
      {bottomGradientComponent}
    </View>
  );
};

export default ShoppingListView;
