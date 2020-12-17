import {useState, useReducer} from 'react';
import apartmentPaymentsLocalReducer from '../stores/apartmentPaymentsLocalReducer';
import apartmentPaymentsLocalState from '../stores/apartmentPaymentsLocalState';

const useApartmentPaymentsModel = () => {
  const [state, localDispatch] = useReducer(
    apartmentPaymentsLocalReducer,
    apartmentPaymentsLocalState,
  );

  const apartmentPaymentsList = [{id: 1}, {id: 2}, {id: 3}];

  return {
    data: {
      state,
      apartmentPaymentsList,
    },
    setters: {},
    localDispatch,
  };
};

export default useApartmentPaymentsModel;
