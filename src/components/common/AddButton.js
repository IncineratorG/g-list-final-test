/* Кнопка добавления.
Кнопка ожидает, что компонент использующий её передаст в неё параметр onClick, в котором будет описана функция,
выполняемая при нажатии на эту кнопку.
* */

import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {icons} from '../../assets/icons';

export const AddButton = ({onClick, visible}) => {
  if (visible === undefined) {
    visible = true;
  }

  const visibilityMode = visible ? 'flex' : 'none';

  return (
    <TouchableHighlight
      style={styles.touchable}
      onPress={() => {
        if (onClick !== undefined) {
          onClick();
        }
      }}>
      <View style={[styles.mainContainer, {display: visibilityMode}]}>
        <Image style={styles.crossIcon} source={icons.cross} />
      </View>
    </TouchableHighlight>
  );
};

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
    transform: [{rotate: '45deg'}, {scale: 0.3}],
  },
  touchable: {
    borderRadius: 38,
  },
});
