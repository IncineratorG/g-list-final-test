import React from 'react';
import useApartmentPaymentsController from './controllers/apartmentPaymentsController';
import ApartmentPaymentsView from './views/ApartmentPaymentsView';
import useApartmentPaymentsModel from './models/apartmentPaymentsModel';

const ApartmentPayments = () => {
  const model = useApartmentPaymentsModel();
  const controller = useApartmentPaymentsController(model);

  return <ApartmentPaymentsView model={model} controller={controller} />;
};

ApartmentPayments.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Платежи',
  };
};

export default ApartmentPayments;
