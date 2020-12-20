import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import PaymentValuesInput from './payment-values-input/PaymentValuesInput';
import PaymentCost from './payment-cost/PaymentCost';
import PaymentsOverallCost from './payments-overall-cost/PaymentsOverallCost';

const PaymentsDescription = () => {
  const overallCostComponent = (
    <View style={styles.overallCostContainer}>
      <PaymentsOverallCost />
    </View>
  );

  const paymentCostComponent = (
    <View style={styles.paymentCostContainer}>
      <PaymentCost />
    </View>
  );

  const valuesInputComponent = (
    <View style={styles.valuesInputContainer}>
      <PaymentValuesInput />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {overallCostComponent}
      {paymentCostComponent}
      {valuesInputComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  overallCostContainer: {
    height: 25,
    alignSelf: 'stretch',
  },
  paymentCostContainer: {
    height: 25,
    alignSelf: 'stretch',
  },
  valuesInputContainer: {
    height: 50,
    alignSelf: 'stretch',
  },
});

export default PaymentsDescription;
