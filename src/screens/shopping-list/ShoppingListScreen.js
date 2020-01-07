/* Экран списка покупок.
Здесь происходит загрузка списка покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список покупок).
* */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AddButton} from '../../components/common/AddButton';
import {EmptyShoppingListScreen} from '../../components/shopping-list-screen/EmptyShoppingListScreen';
import {ShoppingList} from '../../components/shopping-list-screen/ShoppingList';

const ShoppingListScreen = ({navigation}) => {
  const {navigate} = navigation;

  const testList = [
    {
      id: '1',
      name: 'Хлеб',
      quantity: 2,
      unit: 'шт.',
      note: '',
      category: 'other',
      completionStatus: 'not-finished',
    },
    {
      id: '2',
      name: 'Молоко',
      quantity: 2,
      unit: 'л.',
      note: 'домик в деревне',
      category: 'other',
      completionStatus: 'finished',
    },
  ];

  const emptyShoppingListScreenContent = (
    <View style={styles.emptyShoppingListScreenContent}>
      <EmptyShoppingListScreen />
    </View>
  );

  const shoppingList = (
    <View style={styles.shoppingListContainer}>
      <ShoppingList list={testList} />
    </View>
  );

  const shoppingListScreenContent =
    testList.length > 0 ? shoppingList : emptyShoppingListScreenContent;

  return (
    <View style={styles.mainContainer}>
      {shoppingListScreenContent}
      <View style={styles.addShoppingListItemButtonContainer}>
        <AddButton
          style={styles.addShoppingListItemButton}
          onClick={() => {
            navigate('Edit');
          }}
        />
      </View>
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
});

export default ShoppingListScreen;
