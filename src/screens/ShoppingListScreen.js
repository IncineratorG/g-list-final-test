/* Экран списка покупок.
Здесь происходит загрузка списка покупок из хранилища данных и выбор компонента для отображения на основании
загруженных данных (либо компонент пустого экрана, либо список покупок).
* */

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AddButton from '../components/AddButton';
import EmptyShoppingListScreen from '../components/EmptyShoppingListScreen';

export default class ShoppingListScreen extends Component {
  render() {
    const emptyShoppingListScreenContent = (
      <View style={styles.emptyShoppingListScreenContent}>
        <EmptyShoppingListScreen />
      </View>
    );

    const shoppingListScreenContent = emptyShoppingListScreenContent;

    return (
      <View style={styles.mainContainer}>
        {shoppingListScreenContent}
        <View style={styles.addShoppingListItemButtonContainer}>
          <AddButton style={styles.addShoppingListItemButton} />
        </View>
      </View>
    );
  }
}

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
});
