import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';

export const SimpleButton = ({onPress, visible, label}) => {
  if (visible === undefined) {
    visible = true;
  }
  if (!label) {
    label = 'Button';
  }

  const visibilityMode = visible ? 'flex' : 'none';

  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={'transparent'}
      onPress={() => {
        if (onPress !== undefined) {
          onPress();
        }
      }}>
      <View style={[styles.mainContainer, {display: visibilityMode}]}>
        <Text style={{color: 'white', fontSize: 16}}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#4a9dec',
    height: 30,
    width: 30,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  crossIcon: {
    transform: [{rotate: '45deg'}, {scale: 0.5}],
  },
  touchable: {
    borderRadius: 2,
  },
});
