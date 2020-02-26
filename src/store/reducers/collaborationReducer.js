import {
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_FINISHED,
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_FINISHED,
} from '../types/collaborationTypes';

const initialState = {
  currentUser: {
    loading: false,
    phone: '',
    email: '',
    password: '',
    error: {
      description: '',
      status: '',
    },
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
          error: {
            ...state.currentUser.error,
            description: '',
            status: '',
          },
          email: '',
          password: '',
        },
      };
    }

    case SIGN_UP_FINISHED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          phone: action.payload.phone,
          email: action.payload.email,
          password: action.payload.password,
          error: {
            ...state.currentUser.error,
            description: '',
            status: '',
          },
        },
      };
    }

    case SIGN_UP_ERROR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          phone: '',
          email: '',
          password: '',
          error: {
            ...state.currentUser.error,
            description: action.payload.description
              ? action.payload.description
              : '',
            status: action.payload.status ? action.payload.status : '',
          },
        },
      };
    }

    case SIGN_IN_BEGIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          phone: '',
          email: '',
          password: '',
          error: {
            ...state.currentUser.error,
            description: '',
            status: '',
          },
        },
      };
    }

    case SIGN_IN_FINISHED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          phone: action.payload.phone,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    }

    case SIGN_IN_ERROR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          phone: '',
          email: '',
          password: '',
          error: {
            description: action.payload.description
              ? action.payload.description
              : '',
            status: action.payload.status ? action.payload.status : '',
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
