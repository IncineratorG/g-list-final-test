import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddButton from '../components/AddButton';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> Main Screen </Text>
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
});

export default MainScreen;
