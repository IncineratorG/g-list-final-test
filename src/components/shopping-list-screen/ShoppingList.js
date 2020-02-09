/* Компонент, отображающий список покупок на экране списка покупок.
 * */

import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ShoppingListItemsFactory from './shopping-list-item/ShoppingListItemsFactory';

export const ShoppingList = ({list, onStatusPress}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return ShoppingListItemsFactory.get(item, index, onStatusPress);
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
});
