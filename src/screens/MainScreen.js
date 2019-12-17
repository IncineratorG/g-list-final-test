import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddButton from '../components/AddButton';
import EmptyMainScreen from '../components/EmptyMainScreen';
import ListOfShoppingLists from '../components/ListOfShoppingLists';

class MainScreen extends Component {
  render() {
    const testList = [
      {id: '1', name: 'Список 1', completionStatus: 'not-finished'},
      {id: '2', name: 'Список 2', completionStatus: 'finished'},
      {id: '3', name: 'Список 3', completionStatus: 'not-finished'},
      {id: '4', name: 'Список 4', completionStatus: 'not-finished'},
    ];

    const emptyMainScreenContent = (
      <View style={styles.emptyMainScreenContent}>
        <EmptyMainScreen />
      </View>
    );

    const listOfShoppingLists = (
      <View style={styles.listOfShoppingListContainer}>
        <ListOfShoppingLists list={testList} />
      </View>
    );

    let mainScreenContent =
      testList.length > 0 ? listOfShoppingLists : emptyMainScreenContent;

    return (
      <View style={styles.mainContainer}>
        {mainScreenContent}
        <View style={styles.addShoppingListButtonContainer}>
          <AddButton style={styles.addShoppingListButton} />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
  addShoppingListButton: {},
  addShoppingListButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  emptyMainScreenContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 83,
  },
  listOfShoppingListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
});

export default MainScreen;
