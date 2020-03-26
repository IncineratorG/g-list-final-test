import React from 'react';
import {View} from 'react-native';
import {productStylesCompleted} from './completed/styles/productStylesCompleted';
import {productStylesNotCompleted} from './not-completed/styles/productStylesNotCompleted';
import {ProductCompleted} from './completed/ProductCompleted';
import {ProductNotCompleted} from './not-completed/ProductNotCompleted';
import {ProductExtra} from './extra/ProductExtra';
import {
  PRODUCT_COMPLETED,
  PRODUCT_NOT_COMPLETED,
} from '../../../services/storage/data/productStatus';
import {productStylesExtra} from './extra/styles/productStylesExtra';

export default class ProductsFactory {
  static get(listItem, index, onStatusPress) {
    const completedStyles = productStylesCompleted;
    const notCompletedStyles = productStylesNotCompleted;
    const extraStyles = productStylesExtra;

    const completedItem = (
      <ProductCompleted
        styles={completedStyles}
        itemToRender={listItem}
        onStatusPress={onStatusPress}
      />
    );

    const notCompletedItem = (
      <ProductNotCompleted
        styles={notCompletedStyles}
        itemToRender={listItem}
        onStatusPress={onStatusPress}
      />
    );

    const extraItem = (
      <ProductExtra
        styles={extraStyles}
        itemToRender={listItem}
        onStatusPress={onStatusPress}
      />
    );

    const listItemExtra = listItem.extra;
    const listItemCompleted = listItem.completionStatus === PRODUCT_COMPLETED;
    const listItemNotCompleted =
      listItem.completionStatus === PRODUCT_NOT_COMPLETED;

    if (listItemExtra) {
      return extraItem;
    } else if (listItemCompleted) {
      return completedItem;
    } else if (listItemNotCompleted) {
      return notCompletedItem;
    } else {
      return <View />;
    }
  }
}
