import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class ListOfShoppingListsItem extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
        </View>
        <View style={styles.statusContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
      width: 200,
      height: 100,

    // flex: 1,
      // alignSelf: 'stretch',
      backgroundColor: 'red',
     // flexDirection: 'row',
     marginTop: 20,
    // // height: 50,
    // backgroundColor: 'red',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  nameContainer: {
     // flex: 1,
     // alignSelf: 'stretch',
     //  backgroundColor: 'green',
  },
  statusContainer: {
    // // alignSelf: 'stretch',
    // height: 50,
    //  width: 50,
    //  backgroundColor: 'gold',
  },
});
