import {useCallback} from 'react';
import {apla_setPaymentsInputAreaVisibility} from '../stores/apartmentPaymentsLocalActions';

const useApartmentPaymentsController = model => {
  const {localDispatch} = model;

  const shadedBackgroundPressHandler = useCallback(() => {
    localDispatch(apla_setPaymentsInputAreaVisibility({visible: false}));
  }, [localDispatch]);

  const addApartmentPaymentsHandler = useCallback(() => {
    console.log('addApartmentPaymentsHandler()');

    localDispatch(apla_setPaymentsInputAreaVisibility({visible: true}));
  }, [localDispatch]);

  const apartmentPaymentPressHandler = useCallback(({payment}) => {
    console.log('apartmentPaymentPressHandler(): ' + JSON.stringify(payment));
  }, []);

  return {
    shadedBackgroundPressHandler,
    addApartmentPaymentsHandler,
    apartmentPaymentPressHandler,
  };
};

export default useApartmentPaymentsController;
