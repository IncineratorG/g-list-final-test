import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';

const SignButton = ({title, onPress}) => {
  if (!title) {
    title = 'Button';
  }

  return (
    <TouchableNativeFeedback
      style={styles.touchable}
      underlayColor={'grey'}
      onPress={onPress}>
      <View style={styles.mainContainer}>
        <Text style={styles.signOutText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 17,
  },
  signOutText: {
    fontWeight: 'bold',
  },
  touchable: {},
});

export default SignButton;
