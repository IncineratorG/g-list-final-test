import React from 'react';
import {shoppingListItemStylesCompleted} from './completed/styles/ShoppingListItemStylesCompleted';
import {shoppingListItemStylesNotCompleted} from './not-completed/styles/ShoppingListItemStylesNotCompleted';
import {ShoppingListItemCompleted} from './completed/ShoppingListItemCompleted';
import {ShoppingListItemNotCompleted} from './not-completed/ShoppingListItemNotCompleted';
import {PRODUCT_COMPLETED} from '../../../services/storage/data/productStatus';

export default class ShoppingListItemsFactory {
  static get(listItem, index, onStatusPress) {
    const completedStyles = shoppingListItemStylesCompleted;
    const notCompletedStyles = shoppingListItemStylesNotCompleted;

    const completedItem = (
      <ShoppingListItemCompleted
        styles={completedStyles}
        itemToRender={listItem}
        onStatusPress={onStatusPress}
      />
    );

    const notCompletedItem = (
      <ShoppingListItemNotCompleted
        styles={notCompletedStyles}
        itemToRender={listItem}
        onStatusPress={onStatusPress}
      />
    );

    return listItem.completionStatus === PRODUCT_COMPLETED
      ? completedItem
      : notCompletedItem;
  }
}
