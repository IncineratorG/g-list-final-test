import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

export const ProductCategoryItem = ({
  category,
  selectedCategory,
  onCategoryPress,
}) => {
  const itemPressHandler = () => {
    if (onCategoryPress) {
      onCategoryPress(category);
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      // underlayColor={'grey'}
      onPress={itemPressHandler}>
      <View
        style={[
          styles.mainContainer,
          {
            borderColor: category.color,
            opacity: category.completed ? 0.2 : 1.0,
            backgroundColor:
              category.id === selectedCategory ? 'lightgrey' : '#edeef1',
          },
        ]}>
        <Text style={styles.typeTitle}>{category.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    margin: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTitle: {
    margin: 5,
  },
});
