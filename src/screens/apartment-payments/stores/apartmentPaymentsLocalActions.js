import ApartmentPaymentsLocalActionTypes from './apartmentPaymentsLocalActionTypes';

export const apla_setPaymentsInputAreaVisibility = ({visible}) => {
  return {
    type: ApartmentPaymentsLocalActionTypes.SET_PAYMENTS_INPUT_AREA_VISIBILITY,
    payload: {visible},
  };
};
