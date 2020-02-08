/* Компонент, отображающий список списков покупок на стартовом экране.
 * */

import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import ListOfShoppingListsItemsFactory from './list-of-shopping-lists-item/ListOfShoppingListsItemsFactory';
import {icons} from '../../assets/icons';

export const ListOfShoppingLists = ({list, onItemPress, onRemovePress}) => {
  const removeOptionHandler = (listItem, row) => {
    if (onRemovePress) {
      onRemovePress(listItem, row);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SwipeListView
        style={styles.list}
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return ListOfShoppingListsItemsFactory.get(item, onItemPress);
        }}
        keyExtractor={item => item.id.toString()}
        disableRightSwipe={true}
        closeOnRowPress={true}
        closeOnRowOpen={true}
        closeOnRowBeginSwipe={true}
        friction={80}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.options}>
            <TouchableHighlight
              style={styles.removeButtonTouchable}
              onPress={() => {
                // rowMap[data.item.id.toString()].closeRow();
                removeOptionHandler(data.item, rowMap[data.item.id.toString()]);
              }}>
              <View style={styles.removeButtonContainer}>
                <Image style={styles.removeIcon} source={icons.trash} />
              </View>
            </TouchableHighlight>
          </View>
        )}
        rightOpenValue={-75}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 7,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  options: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    // marginTop: 7,
    marginBottom: 7,
    borderRadius: 5,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  removeButtonContainer: {
    backgroundColor: 'red',
    width: 80,
    height: '100%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonTouchable: {
    width: 80,
    height: '100%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    width: '40%',
    height: '40%',
  },
});
