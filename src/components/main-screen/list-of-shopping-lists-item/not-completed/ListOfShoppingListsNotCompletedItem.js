import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export const ListOfShoppingListsNotCompletedItem = ({
  styles,
  listItem,
  onItemPress,
}) => {
  const onItemPressHandler = () => {
    if (onItemPress) {
      onItemPress(listItem.id);
    }
  };

  return (
    <TouchableHighlight
      style={styles.mainContainerTouchable}
      onPress={onItemPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameNotFinished}>{listItem.listName}</Text>
          </View>
          <View style={styles.completionContainer}>
            <Text style={styles.completionNotFinished}>
              Куплено {listItem.completedItemsCount} из{' '}
              {listItem.totalItemsCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
