// Кнопка применяемая для подтверждения действий

import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {icons} from '../assets/icons';

export default class ConfirmButton extends Component {
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
          <Image style={styles.crossIcon} source={icons.checkmark} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#41D8B1',
    height: 75,
    width: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  crossIcon: {
    transform: [{scale: 1.5}],
  },
  touchable: {
    borderRadius: 38,
  },
});
