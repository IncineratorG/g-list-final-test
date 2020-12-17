import React from 'react';
import ApartmentsView from './views/ApartmentsView';
import useApartmentsModel from './models/apartmentsModel';
import useApartmentsController from './controllers/apartmentsController';

const Apartments = () => {
  const model = useApartmentsModel();
  const controller = useApartmentsController(model);

  return <ApartmentsView model={model} controller={controller} />;
};

Apartments.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Квартиры',
  };
};

export default Apartments;
