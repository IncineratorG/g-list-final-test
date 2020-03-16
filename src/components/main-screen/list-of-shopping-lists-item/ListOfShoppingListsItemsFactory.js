import React from 'react';
import {View, Text} from 'react-native';
import {listOfShoppingListsItemStylesCompleted} from './completed/styles/listOfShoppingListsItemStylesCompleted';
import {listOfShoppingListsItemStylesNotCompleted} from './not-completed/styles/listOfShoppingListsItemStylesNotCompleted';
import {ListOfShoppingListsItemNotCompleted} from './not-completed/ListOfShoppingListsItemNotCompleted';
import {listOfShoppingListsItemStylesIncoming} from './incoming/styles/listOfShoppingListItemStylesIncoming';
import {ListOfShoppingListsItemIncoming} from './incoming/ListOfShoppingListItemIncoming';
import {ListOfShoppingListsItemOutgoing} from './outgoing/ListOfShoppingListItemOutgoing';
import {listOfShoppingListsItemStylesOutgoing} from './outgoing/styles/listOfShoppingListItemStylesOutgoing';
import {ListOfShoppingListsItemExtra} from './extra/ListOfShoppingListsItemExtra';
import {listOfShoppingListsItemStylesExtra} from './extra/styles/listOfShoppingListsItemStylesExtra';

export default class ListOfShoppingListsItemsFactory {
  static get(listItem, onItemPress) {
    const completedItemStyles = listOfShoppingListsItemStylesCompleted;
    const notCompletedItemStyles = listOfShoppingListsItemStylesNotCompleted;
    const incomingItemStyles = listOfShoppingListsItemStylesIncoming;
    const outgoingItemStyles = listOfShoppingListsItemStylesOutgoing;
    const extraItemStyles = listOfShoppingListsItemStylesExtra;

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
    const incomingItem = (
      <ListOfShoppingListsItemIncoming
        styles={incomingItemStyles}
        listItem={listItem}
        onItemPress={onItemPress}
      />
    );
    const outgoingItem = (
      <ListOfShoppingListsItemOutgoing
        styles={outgoingItemStyles}
        listItem={listItem}
        onItemPress={onItemPress}
      />
    );
    const extraItem = (
      <ListOfShoppingListsItemExtra
        styles={extraItemStyles}
        listItem={listItem}
        onItemPress={onItemPress}
      />
    );

    const listItemCompleted =
      listItem.totalItemsCount > 0 &&
      listItem.completedItemsCount >= listItem.totalItemsCount;

    const listItemExtra = listItem.extra;
    const listItemLocal = listItem.local;
    const listItemIncoming = listItem.incoming;
    const listItemOutgoing = listItem.outgoing;

    if (listItemExtra) {
      return extraItem;
    } else if (listItemLocal) {
      return listItemCompleted ? completedItem : notCompletedItem;
    } else if (listItemOutgoing) {
      return outgoingItem;
    } else if (listItemIncoming) {
      return incomingItem;
    } else {
      return <View />;
    }
  }
}
