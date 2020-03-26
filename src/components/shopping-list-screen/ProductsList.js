/* Компонент, отображающий список покупок на экране списка покупок.
 * */

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import ProductsFactory from './product-list-item/ProductsFactory';
import {icons} from '../../assets/icons';

export const ProductsList = ({
  list,
  onStatusPress,
  onRemovePress,
  editable,
}) => {
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
        renderItem={({item, index}) => {
          return ProductsFactory.get(item, index, onStatusPress);
        }}
        keyExtractor={item => item.id.toString()}
        disableRightSwipe={true}
        disableLeftSwipe={!editable}
        closeOnRowPress={true}
        closeOnRowOpen={true}
        closeOnRowBeginSwipe={true}
        friction={80}
        renderHiddenItem={(data, rowMap) => {
          const {item} = data;
          if (item.extra) {
            return <View />;
          }
          return (
            <View style={styles.options}>
              <TouchableHighlight
                style={styles.removeButtonTouchable}
                onPress={() => {
                  // rowMap[data.item.id.toString()].closeRow();
                  removeOptionHandler(
                    data.item,
                    rowMap[data.item.id.toString()],
                  );
                }}>
                <View style={styles.removeButtonContainer}>
                  <Image style={styles.removeIcon} source={icons.trash} />
                </View>
              </TouchableHighlight>
            </View>
          );
        }}
        rightOpenValue={-75}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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
    marginTop: 7,
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  removeButtonTouchable: {
    width: 80,
    height: '100%',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  removeIcon: {
    width: '50%',
    height: 30,
  },
});

// export const ProductsList = ({list, onStatusPress}) => {
//   return (
//     <View style={styles.mainContainer}>
//       <FlatList
//         style={styles.list}
//         data={list}
//         showsVerticalScrollIndicator={false}
//         renderItem={({item, index}) => {
//           return ProductsFactory.get(item, index, onStatusPress);
//         }}
//         keyExtractor={item => item.id.toString()}
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   list: {
//     flex: 1,
//   },
// });
