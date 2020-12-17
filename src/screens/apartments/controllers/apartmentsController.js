import {useCallback} from 'react';

const useApartmentsController = model => {
  const {navigation} = model;

  const addApartmentButtonHandler = useCallback(() => {
    console.log('addApartmentButtonHandler()');
  }, []);

  const apartmentPressHandler = useCallback(
    ({apartment}) => {
      console.log('apartmentPressHandler(): ' + JSON.stringify(apartment));
      navigation.navigate('ApartmentPayments');
    },
    [navigation],
  );

  return {
    addApartmentButtonHandler,
    apartmentPressHandler,
  };
};

export default useApartmentsController;
