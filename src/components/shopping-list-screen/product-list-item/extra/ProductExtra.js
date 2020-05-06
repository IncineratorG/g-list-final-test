import {View} from 'react-native';
import React from 'react';

const ProductExtra = ({styles, itemToRender, onStatusPress}) => {
  return <View style={styles.mainContainer} />;
};

const comparator = (prevProps, currProps) => {
  return prevProps.itemToRender.id === currProps.itemToRender.id;
};

export default React.memo(ProductExtra, comparator);
