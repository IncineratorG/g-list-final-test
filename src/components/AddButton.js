import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {icons} from '../assets/icons';

export default class AddButton extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.crossIcon} source={icons.cross} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#5dbcd2',
    height: 75,
    width: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  crossIcon: {
    transform: [{rotate: '45deg'}, {scale: 1.5}],
  },
});
