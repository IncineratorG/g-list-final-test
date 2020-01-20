/* Экран списка покупок.
Здесь происходит загрузка списка покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список покупок).
* */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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

const ShoppingListScreen = ({navigation}) => {
  const {navigate} = navigation;

  const [inputAreaVisible, setInputAreaVisible] = useState(false);

  const dispatch = useDispatch();

  let units = useSelector(state => state.shoppingList.units);
  let classes = useSelector(state => state.shoppingList.classes);
  let shoppingListId = useSelector(
    state => state.shoppingList.currentShoppingListId,
  );
  let productsList = useSelector(
    state => state.shoppingList.currentShoppingListItems,
  );

  const products = productsList
    .map(product => {
      return {
        id: product.id,
        listId: product.parentId,
        name: product.name,
        quantity: product.quantity,
        unit: units.filter(unit => unit.id === product.unitId)[0].name,
        note: product.note,
        category: classes.filter(cl => cl.id === product.classId)[0].name,
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

  const emptyShoppingListScreenContent = (
    <View style={styles.emptyShoppingListScreenContent}>
      <EmptyShoppingListScreen />
    </View>
  );

  const shoppingList = (
    <View style={styles.shoppingListContainer}>
      <ShoppingList list={products} />
    </View>
  );

  const shoppingListScreenContent =
    products.length > 0 ? shoppingList : emptyShoppingListScreenContent;

  const shadedBackground = inputAreaVisible ? (
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
      {shadedBackground}
    </View>
  );
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
});

export default ShoppingListScreen;
