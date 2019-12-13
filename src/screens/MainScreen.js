import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> Main Screen </Text>
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

export default MainScreen;
