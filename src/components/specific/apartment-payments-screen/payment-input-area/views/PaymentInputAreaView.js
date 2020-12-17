import React from 'react';
import {View, StyleSheet} from 'react-native';

const PaymentInputAreaView = ({model, controller}) => {
  return <View style={styles.mainContainer} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default PaymentInputAreaView;
