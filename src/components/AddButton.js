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
    backgroundColor: '#4a9dec',
    height: 75,
    width: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  crossIcon: {
    transform: [{rotate: '45deg'}, {scale: 0.5}],
  },
});
