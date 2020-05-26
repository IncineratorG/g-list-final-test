import React from 'react';
import {View} from 'react-native';
import {productStylesNotCompleted} from './not-completed/styles/productStylesNotCompleted';
import {productStylesCompleted} from './completed/styles/productStylesCompleted';
import {productStylesExtra} from './extra/styles/productStylesExtra';
import ProductCompleted from './completed/ProductCompleted';
import ProductNotCompleted from './not-completed/ProductNotCompleted';
import ProductExtra from './extra/ProductExtra';
import {
  PRODUCT_COMPLETED,
  PRODUCT_NOT_COMPLETED,
} from '../../../services/storage/data/productStatus';

const GeneralProduct = ({
  product,
  onItemPress,
  onItemLongPress,
  onStatusPress,
  unitsMap,
  classesMap,
  selectedCategory,
}) => {
  let productItem = {...product};
  productItem.unit = unitsMap.get(product.unitId)
    ? unitsMap.get(product.unitId).name
    : '';
  productItem.category = classesMap.get(product.classId)
    ? classesMap.get(product.classId).name
    : '';

  const completedProduct = (
    <ProductCompleted
      styles={productStylesCompleted}
      itemToRender={productItem}
      onStatusPress={onStatusPress}
      selectedCategory={selectedCategory}
    />
  );

  const notCompletedProduct = (
    <ProductNotCompleted
      styles={productStylesNotCompleted}
      itemToRender={productItem}
      onItemPress={onItemPress}
      onItemLongPress={onItemLongPress}
      onStatusPress={onStatusPress}
      classesMap={classesMap}
      selectedCategory={selectedCategory}
    />
  );

  const extraProduct = (
    <ProductExtra
      styles={productStylesExtra}
      itemToRender={productItem}
      onStatusPress={onStatusPress}
    />
  );

  const productExtra = productItem.extra;
  const productCompleted = productItem.completionStatus === PRODUCT_COMPLETED;
  const productNotCompleted =
    productItem.completionStatus === PRODUCT_NOT_COMPLETED;

  if (productExtra) {
    return extraProduct;
  } else if (productCompleted) {
    return completedProduct;
  } else if (productNotCompleted) {
    return notCompletedProduct;
  } else {
    return <View />;
  }
};

export default React.memo(GeneralProduct);

// const productComparator = (prevProps, currProps) => {
//   return (
//     prevProps.product.completionStatus === currProps.product.completionStatus ||
//     prevProps.product.updateTimestamp === currProps.product.updateTimestamp
//   );
// };
