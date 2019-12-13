import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AddButton from '../components/AddButton';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> Main Screen </Text>
        <AddButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});

export default MainScreen;
