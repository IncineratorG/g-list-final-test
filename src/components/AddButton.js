/* Кнопка добавления.
Кнопка ожидает, что компонент использующий её передаст в неё параметр onClick, в котором будет описана функция,
выполняемая при нажатии на эту кнопку.
* */

import React, {Component} from 'react';
          import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
          import {icons} from '../assets/icons';

          export default class AddButton extends Component {
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
  touchable: {
    borderRadius: 38,
  },
});
