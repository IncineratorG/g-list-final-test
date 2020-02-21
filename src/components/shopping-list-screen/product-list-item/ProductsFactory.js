import React from 'react';
import {productStylesCompleted} from './completed/styles/productStylesCompleted';
import {productStylesNotCompleted} from './not-completed/styles/productStylesNotCompleted';
import {ProductCompleted} from './completed/ProductCompleted';
import {ProductNotCompleted} from './not-completed/ProductNotCompleted';
import {PRODUCT_COMPLETED} from '../../../services/storage/data/productStatus';

export default class ProductsFactory {
  static get(listItem, index, onStatusPress) {
    const completedStyles = productStylesCompleted;
    const notCompletedStyles = productStylesNotCompleted;

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

    return listItem.completionStatus === PRODUCT_COMPLETED
      ? completedItem
      : notCompletedItem;
  }
}
