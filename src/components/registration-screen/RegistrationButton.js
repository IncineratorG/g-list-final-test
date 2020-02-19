import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export const RegistrationButton = ({title, onPress}) => {
  if (!title) {
    title = 'Button';
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 200,
    height: 50,
    backgroundColor: '#4a9dec',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
