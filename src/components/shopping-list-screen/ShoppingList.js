/* Компонент, отображающий список покупок на экране списка покупок.
 * */

import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ShoppingListItem} from './shopping-list-item/ShoppingListItem';

export const ShoppingList = ({list}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <ShoppingListItem listItem={item} />;
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
