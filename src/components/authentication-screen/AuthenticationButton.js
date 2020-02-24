import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const AuthenticationButton = ({title, onPress}) => {
  if (!title) {
    title = 'Button';
  }

  return (
    <TouchableHighlight style={styles.touchable} onPress={onPress}>
      <LinearGradient
        style={styles.gradient}
        colors={['#0072e5', '#0086ea', '#0098ef', '#00a9f4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 30,
  },
  mainContainer: {
    width: 250,
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: 250,
    height: 50,
    borderRadius: 30,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
