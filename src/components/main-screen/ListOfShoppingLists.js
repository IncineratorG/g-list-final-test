/* Компонент, отображающий список списков покупок на стартовом экране.
 * */

import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListOfShoppingListsItem} from './ListOfShoppingListsItem';

export const ListOfShoppingLists = ({list, onItemPress}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        data={list}
        renderItem={({item}) => {
          return (
            <ListOfShoppingListsItem
              listItem={item}
              onItemPress={onItemPress}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 7,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
});
