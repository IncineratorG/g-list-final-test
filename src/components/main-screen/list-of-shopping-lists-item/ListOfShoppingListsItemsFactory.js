import React from 'react';
import {View, Text} from 'react-native';
import {listOfShoppingListsCompletedItemStyle} from './completed/styles/ListOfShoppingListsCompletedItemStyle';
import {listOfShoppingListsNotCompletedItemStyle} from './not-completed/styles/ListOfShoppingListsNotCompletedItemStyle';
import {ListOfShoppingListsNotCompletedItem} from './not-completed/ListOfShoppingListsNotCompletedItem';

export default class ListOfShoppingListsItemsFactory {
  static get(listItem, onItemPress) {
    const completedItemStyle = listOfShoppingListsCompletedItemStyle;
    const notCompletedItemStyle = listOfShoppingListsNotCompletedItemStyle;

    const completedItem = (
      <View>
        <Text>Completed Item</Text>
      </View>
    );

    const notCompletedItem = (
      <ListOfShoppingListsNotCompletedItem
        styles={notCompletedItemStyle}
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
