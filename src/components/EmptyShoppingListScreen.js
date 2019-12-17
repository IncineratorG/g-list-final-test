import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {icons} from '../assets/icons';

export default class EmptyShoppingListScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>EmptyShoppingListScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
