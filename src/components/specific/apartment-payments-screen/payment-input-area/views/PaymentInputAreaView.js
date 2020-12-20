import React from 'react';
import {View, StyleSheet} from 'react-native';
import PaymentTypes from './payment-types/PaymentTypes';
import PaymentsDescription from './payments-description/PaymentsDescription';

const PaymentInputAreaView = ({model, controller}) => {
  const paymentsDescriptionComponent = (
    <View style={styles.paymentsDescriptionContainer}>
      <PaymentsDescription />
    </View>
  );

  const paymentTypesComponent = (
    <View style={styles.paymentTypesContainer}>
      <PaymentTypes />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {paymentsDescriptionComponent}
      {paymentTypesComponent}
    </View>
  );
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
  paymentsDescriptionContainer: {
    height: 100,
    alignSelf: 'stretch',
  },
  paymentTypesContainer: {
    height: 50,
    alignSelf: 'stretch',
  },
});

export default PaymentInputAreaView;
