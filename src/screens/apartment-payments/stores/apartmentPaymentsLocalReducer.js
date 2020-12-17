import ApartmentPaymentsLocalActionTypes from './apartmentPaymentsLocalActionTypes';

function apartmentPaymentsLocalReducer(state, action) {
  switch (action.type) {
    case ApartmentPaymentsLocalActionTypes.SET_PAYMENTS_INPUT_AREA_VISIBILITY: {
      return {
        ...state,
        paymentsInputArea: {
          ...state.paymentsInputArea,
          visible: action.payload.visible,
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default apartmentPaymentsLocalReducer;
