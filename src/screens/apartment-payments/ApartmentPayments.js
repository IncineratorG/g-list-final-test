import React from 'react';
import {View} from 'react-native';

const ApartmentPayments = () => {
  return <View style={{flex: 1, backgroundColor: 'grey'}} />;
};

ApartmentPayments.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Платежи',
  };
};

export default ApartmentPayments;
