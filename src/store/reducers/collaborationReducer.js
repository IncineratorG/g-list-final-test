import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_FINISHED,
} from '../types/collaborationTypes';

const initialState = {
  currentUser: {
    loading: false,
    email: '',
    password: '',
    error: '',
  },
};

export const collaborationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_BEGIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: '',
          email: '',
          password: '',
        },
      };
    }

    case SIGN_UP_ERROR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          error: action.payload,
          email: '',
          password: '',
        },
      };
    }

    default: {
      return state;
    }
  }
};
