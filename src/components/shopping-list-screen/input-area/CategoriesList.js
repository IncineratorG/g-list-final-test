import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

export const CategoriesList = ({userInput, categories, onCategoryPress}) => {
  let validCategories = [];
  if (!userInput) {
    validCategories = [...categories];
  } else {
    validCategories = categories.filter(category => {
      return category.name.toLowerCase().startsWith(userInput.toLowerCase());
    });
  }
  if (!validCategories.length) {
    const otherCategoryData = categories.filter(
      category => category.name === 'Другое',
    );
    if (otherCategoryData.length) {
      validCategories.push(otherCategoryData[0]);
    } else {
      validCategories.push({id: 'MAX_VALUE', name: 'Нет совпадений'});
    }
  }

  const renderItem = ({item}) => {
    const categoryPressHandler = () => {
      if (onCategoryPress) {
        onCategoryPress(item);
      }
    };

    return (
      <TouchableHighlight
        style={styles.categoryTouchable}
        onPress={categoryPressHandler}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        data={validCategories}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
  },
  list: {
    flex: 1,
  },
  categoryContainer: {
    height: 30,
    backgroundColor: 'lightgrey',
    // marginLeft: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryTouchable: {
    height: 30,
    marginLeft: 8,
    borderRadius: 10,
  },
  categoryName: {
    marginLeft: 10,
    marginRight: 10,
  },
});
