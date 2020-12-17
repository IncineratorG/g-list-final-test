import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ProductCategoryItem} from './ProductCategoryItem';

export const ProductCategoriesList = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  const renderItem = ({item}) => {
    return (
      <ProductCategoryItem
        category={item}
        selectedCategory={selectedCategory}
        onCategoryPress={onCategoryPress}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        inverted={true}
        data={categories}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
