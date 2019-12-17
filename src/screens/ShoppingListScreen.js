import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class ShoppingListScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Список покупок</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
