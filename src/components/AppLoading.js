import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const AppLoading = ({startAsync, onFinish, onError}) => {
  if (startAsync) {
    startAsync()
      .then(value => {
        if (onFinish) {
          onFinish();
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }

  return (
    <View style={styles.mainContainer}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
