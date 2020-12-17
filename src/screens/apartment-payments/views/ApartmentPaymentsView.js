import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {AddButton} from '../../../components/common/AddButton';
import ApartmentPaymentsList from '../../../components/specific/apartment-payments-screen/apartment-payments-list/ApartmentPaymentsList';
import PaymentInputArea from '../../../components/specific/apartment-payments-screen/payment-input-area/PaymentInputArea';

const ApartmentPaymentsView = ({model, controller}) => {
  const {
    data: {
      apartmentPaymentsList,
      state: {
        paymentsInputArea: {visible: paymentsInputAreaVisible},
      },
    },
  } = model;

  const {
    shadedBackgroundPressHandler,
    addApartmentPaymentsHandler,
    apartmentPaymentPressHandler,
  } = controller;

  const apartmentPaymentsListComponent = (
    <View style={styles.apartmentPaymentsListContainer}>
      <ApartmentPaymentsList
        paymentsList={apartmentPaymentsList}
        onPaymentPress={apartmentPaymentPressHandler}
      />
    </View>
  );

  const addPaymentsButtonComponent = (
    <View style={styles.addApartmentPaymentsButtonContainer}>
      <AddButton visible={true} onClick={addApartmentPaymentsHandler} />
    </View>
  );

  const paymentsInputComponent = paymentsInputAreaVisible ? (
    <View style={styles.paymentsInputContainer}>
      <PaymentInputArea />
    </View>
  ) : null;

  const shadedBackgroundComponent = paymentsInputAreaVisible ? (
    <TouchableWithoutFeedback
      onPress={shadedBackgroundPressHandler}
      behavior={'position'}>
      <View style={styles.shadedBackground} />
    </TouchableWithoutFeedback>
  ) : null;

  return (
    <View style={styles.mainContainer}>
      {apartmentPaymentsListComponent}
      {addPaymentsButtonComponent}
      {paymentsInputComponent}
      {shadedBackgroundComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  addApartmentPaymentsButtonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    zIndex: 10,
  },
  apartmentPaymentsListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'purple',
  },
  paymentsInputContainer: {
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  shadedBackground: {
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ApartmentPaymentsView;
