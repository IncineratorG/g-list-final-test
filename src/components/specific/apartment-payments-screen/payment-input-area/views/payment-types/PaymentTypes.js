import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import PaymentTypesList from './payment-types-list/PaymentTypesList';

const PaymentTypes = () => {
  return (
    <View style={styles.mainContainer}>
      <PaymentTypesList />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default PaymentTypes;
