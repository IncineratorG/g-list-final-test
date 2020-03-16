import {Text, TouchableHighlight, View} from 'react-native';
import React from 'react';

export const ListOfShoppingListsItemIncoming = ({
  styles,
  listItem,
  onItemPress,
}) => {
  const onItemPressHandler = () => {
    if (onItemPress) {
      onItemPress(listItem.id);
    }
  };

  const sharedLabel = listItem.shared ? 'Shared' : 'Not Shared';

  return (
    <TouchableHighlight
      style={styles.mainContainerTouchable}
      onPress={onItemPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameNotFinished}>{listItem.name}</Text>
          </View>
          <View style={styles.footerContainer}>
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
