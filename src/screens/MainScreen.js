import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddButton from '../components/AddButton';
import EmptyMainScreen from '../components/EmptyMainScreen';
import ListOfShoppingLists from '../components/ListOfShoppingLists';

class MainScreen extends Component {
  render() {
    const emptyMainScreenContent = (
      <View style={styles.emptyMainScreenContent}>
        <EmptyMainScreen />
      </View>
    );

    let listOfShoppingLists = (
      <View style={styles.listOfShoppingListContainer}>
        <ListOfShoppingLists />
      </View>
    );

    let mainScreenContent = listOfShoppingLists;

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
