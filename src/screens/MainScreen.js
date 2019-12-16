import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddButton from '../components/AddButton';
import EmptyMainScreen from '../components/EmptyMainScreen';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
          <View style={styles.mainScreenContent}>
            <EmptyMainScreen/>
          </View>
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
    mainScreenContent: {
    flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 83,
    },
});

export default MainScreen;
