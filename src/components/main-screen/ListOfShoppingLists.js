/* Компонент, отображающий список списков покупок на стартовом экране.
 * */

import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListOfShoppingListsItem} from './ListOfShoppingListsItem';

export const ListOfShoppingLists = ({list}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        data={list}
        renderItem={({item}) => {
          return <ListOfShoppingListsItem listItem={item} />;
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
