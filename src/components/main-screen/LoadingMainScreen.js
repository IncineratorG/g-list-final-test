import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';

export const LoadingMainScreen = () => {
  const fakeItems = ['1', '2', '3', '4'];

  const onItemPressHandler = () => {};
  const onMenuPressHandler = () => {};

  const renderItem = () => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.bodyContainer}>
          <View style={styles.bodyContent} />
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.footerContainer}>
          <View style={styles.footerContent} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listTypesContainer}>
        <View style={styles.listTypeItem}>
          <View style={styles.typeTitle} />
        </View>
        <View style={styles.listTypeItem}>
          <View style={styles.typeTitle} />
        </View>
        <View style={styles.listTypeItem}>
          <View style={styles.typeTitle} />
        </View>
      </View>
      <View style={styles.listOfShoppingListContainer}>
        <View style={styles.listOfShoppingLists}>
          <FlatList
            style={styles.list}
            data={fakeItems}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#edeef1',
  },
  listTypesContainer: {
    alignSelf: 'stretch',
    height: 40,
    marginTop: 14,
    marginLeft: 4,
    marginRight: 4,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  listTypeItem: {
    backgroundColor: 'lightgrey',
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 4,
  },
  typeTitle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'lightgrey',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 4,
  },
  listOfShoppingListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  listOfShoppingLists: {
    marginTop: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  list: {
    flex: 1,
    paddingTop: 8,
  },

  listItemContainer: {
    height: 80,
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 8,
    marginRight: 8,
  },
  bodyContainer: {
    height: 50,
    alignSelf: 'stretch',
  },
  bodyContent: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 15,
    marginBottom: 12,
    borderRadius: 4,
  },
  separatorLine: {
    // flex: 1,
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 4,
    marginRight: 4,
  },
  footerContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  footerContent: {
    backgroundColor: 'lightgrey',
    flex: 1,
    width: 180,
    // alignSelf: 'stretch',
    marginLeft: 35,
    marginRight: 20,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
});
