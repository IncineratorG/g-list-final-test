import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class AddButton extends Component {
  render() {
    return <View style={styles.mainContainer} />;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
});
