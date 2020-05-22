import {SET_ONLINE} from '../types/systemTypes';

const initialState = {
  online: false,
};

export const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE: {
      return {
        ...state,
        online: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
