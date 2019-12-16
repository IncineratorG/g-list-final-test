import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import ListOfShoppingListsItem from './ListOfShoppingListsItem';

export default class ListOfShoppingLists extends Component {
  render() {
    const testList = [
      {id: 1, name: 'Список 1', completionStatus: 'not-finished'},
      {id: 2, name: 'Список 2', completionStatus: 'finished'},
      {id: 3, name: 'Список 3', completionStatus: 'not-finished'},
      {id: 4, name: 'Список 4', completionStatus: 'not-finished'},
    ];

    return (
      <View style={styles.mainContainer}>
        <FlatList
            data={testList}
            renderItem={({item}) => <ListOfShoppingListsItem listItem={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignSelf: 'stretch',
  },
});
