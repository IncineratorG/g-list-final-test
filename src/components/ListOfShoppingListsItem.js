import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class ListOfShoppingListsItem extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>kjasfkljasd;lf</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.status} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 25,
    flexDirection: 'row',
    elevation: 1,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 18,
    color: '#424242',
  },
  statusContainer: {
    width: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  status: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 6,
    marginRight: 10,
  },
});
