import React from 'react';
import {View, Text} from 'react-native';
import {listOfShoppingListsItemStylesCompleted} from './completed/styles/ListOfShoppingListsItemStylesCompleted';
import {listOfShoppingListsItemStylesNotCompleted} from './not-completed/styles/ListOfShoppingListsItemStylesNotCompleted';
import {ListOfShoppingListsItemNotCompleted} from './not-completed/ListOfShoppingListsItemNotCompleted';

export default class ListOfShoppingListsItemsFactory {
  static get(listItem, onItemPress) {
    const completedItemStyles = listOfShoppingListsItemStylesCompleted;
    const notCompletedItemStyles = listOfShoppingListsItemStylesNotCompleted;

    const completedItem = (
      <View>
        <Text>Completed Item</Text>
      </View>
    );

    const notCompletedItem = (
      <ListOfShoppingListsItemNotCompleted
        styles={notCompletedItemStyles}
        listItem={listItem}
        onItemPress={onItemPress}
      />
    );

    const listItemCompleted =
      listItem.totalItemsCount > 0 &&
      listItem.completedItemsCount >= listItem.totalItemsCount;

    return listItemCompleted ? completedItem : notCompletedItem;
  }
}
