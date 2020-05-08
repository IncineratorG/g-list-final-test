import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

export const CategoriesList = ({categories, onCategoryPress}) => {
  return <View style={styles.mainContainer} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
