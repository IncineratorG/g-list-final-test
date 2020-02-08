/* Экран списка покупок.
Здесь происходит загрузка списка покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список покупок).
* */

import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {AddButton} from '../../components/common/AddButton';
import {EmptyShoppingListScreen} from '../../components/shopping-list-screen/EmptyShoppingListScreen';
import {ShoppingList} from '../../components/shopping-list-screen/ShoppingList';
import InputArea from '../../components/shopping-list-screen/input-area/InputArea';
import {useSelector, useDispatch} from 'react-redux';
import {
  addProduct,
  loadClasses,
  loadUnits,
} from '../../store/actions/shoppingListActions';
import LinearGradient from 'react-native-linear-gradient';

const ShoppingListScreen = ({navigation}) => {
  const [inputAreaVisible, setInputAreaVisible] = useState(false);

  const dispatch = useDispatch();

  const units = useSelector(state => state.shoppingList.units);
  const classes = useSelector(state => state.shoppingList.classes);
  const shoppingListId = useSelector(
    state => state.shoppingList.currentShoppingList.id,
  );
  const shoppingListName = useSelector(
    state => state.shoppingList.currentShoppingList.name,
  );
  const productsList = useSelector(
    state => state.shoppingList.currentShoppingList.products,
  );
  const listLoading = useSelector(
    state => state.shoppingList.currentShoppingList.loading,
  );

  const getUnitName = unitId => {
    const filteredUnits = units.filter(unit => unit.id === unitId);
    return filteredUnits.length ? filteredUnits[0].name : '';
  };

  const getCategoryName = classId => {
    const filteredClasses = classes.filter(cl => cl.id === classId);
    return filteredClasses.length ? filteredClasses[0].name : '';
  };

  const products = productsList
    .map(product => {
      return {
        id: product.id,
        listId: product.parentId,
        name: product.name,
        quantity: product.quantity,
        unit: getUnitName(product.unitId),
        note: product.note,
        category: getCategoryName(product.classId),
        completionStatus: product.completionStatus,
      };
    })
    .sort((p1, p2) => p1.id < p2.id);

  const addProductButtonHandler = () => {
    setInputAreaVisible(true);
  };

  const inputAreaHideHandler = () => {
    setInputAreaVisible(false);
  };

  const inputAreaSubmitValuesHandler = values => {
    dispatch(
      addProduct({
        shoppingListId: shoppingListId,
        name: values.productName,
        quantity: values.quantityValue,
        unitId: values.quantityUnit,
        note: values.note,
        classId: 1,
      }),
    );
  };

  useEffect(() => {
    dispatch(loadUnits());
    dispatch(loadClasses());
  }, [dispatch]);

  useEffect(() => {
    navigation.setParams({shoppingListName});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListName]);

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
      <ShoppingList list={products} />
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

ShoppingListScreen.navigationOptions = ({navigation}) => {
  const shoppingListName = navigation.getParam('shoppingListName');
  return {
    headerTitle: shoppingListName ? shoppingListName : '',
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
  addShoppingListItemButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
    zIndex: 10,
  },
  addShoppingListItemButton: {},
  emptyShoppingListScreenContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 83,
  },
  shoppingListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  inputAreaContainer: {
    alignSelf: 'stretch',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  shadedBackground: {
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
  },
});

export default ShoppingListScreen;
