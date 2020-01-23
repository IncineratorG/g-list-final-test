import React from 'react';
import {View, StyleSheet} from 'react-native';

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

  return <View style={styles.mainContainer} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
