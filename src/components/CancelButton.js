import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {icons} from '../assets/icons';

export default class CancelButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => {
          if (this.props.onClick !== undefined) {
            this.props.onClick();
          }
        }}>
        <View style={styles.mainContainer}>
          <Image style={styles.crossIcon} source={icons.cross} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    height: 75,
    width: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  crossIcon: {
    transform: [{scale: 0.5}],
  },
  touchable: {
    borderRadius: 38,
  },
});
