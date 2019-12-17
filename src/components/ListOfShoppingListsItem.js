import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {icons} from '../assets/icons';

export default class ListOfShoppingListsItem extends Component {
  render() {
    const statusFinishedComponent = (
      <View style={styles.statusFinished}>
        <Image style={styles.checmarkIcon} source={icons.checkmark} />
      </View>
    );

    const statusNotFinishedComponent = (
      <View style={styles.statusNotFinished} />
    );

    let statusComponent =
      this.props.listItem.completionStatus === 'finished'
        ? statusFinishedComponent
        : statusNotFinishedComponent;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{this.props.listItem.name}</Text>
        </View>
        <View style={styles.statusContainer}>{statusComponent}</View>
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
  statusNotFinished: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 6,
    marginRight: 10,
  },
  statusFinished: {
    width: 30,
    height: 30,
    backgroundColor: '#41D8B1',
    borderRadius: 15,
    elevation: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checmarkIcon: {
    transform: [{scale: 0.7}],
  },
});
