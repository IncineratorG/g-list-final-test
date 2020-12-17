import React from 'react';
import {View} from 'react-native';
import {productStylesCompleted} from './completed/styles/productStylesCompleted';
import {productStylesNotCompleted} from './not-completed/styles/productStylesNotCompleted';
import {productStylesExtra} from './extra/styles/productStylesExtra';
import {ProductCompleted} from './completed/ProductCompleted';
import {ProductNotCompleted} from './not-completed/ProductNotCompleted';
import {ProductExtra} from './extra/ProductExtra';
import {
  PRODUCT_COMPLETED,
  PRODUCT_NOT_COMPLETED,
} from '../../../../services/storage/data/productStatus';
import {productStylesRejected} from './rejected/styles/productStylesRejected';
import {ProductRejected} from './rejected/ProductRejected';

export default class ProductsFactory {
  static get(listItem, index, onStatusPress) {
    const completedStyles = productStylesCompleted;
    const notCompletedStyles = productStylesNotCompleted;
    const rejectedStyles = productStylesRejected;
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

    const rejectedItem = (
      <ProductRejected
        styles={productStylesRejected}
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

    const listItemRejected = listItem.rejected;
    const listItemExtra = listItem.extra;
    const listItemCompleted = listItem.completionStatus === PRODUCT_COMPLETED;
    const listItemNotCompleted =
      listItem.completionStatus === PRODUCT_NOT_COMPLETED;

    if (listItemExtra) {
      return extraItem;
    } else if (listItemRejected) {
      return rejectedItem;
    } else if (listItemCompleted) {
      return completedItem;
    } else if (listItemNotCompleted) {
      return notCompletedItem;
    } else {
      return <View />;
    }
  }
}
