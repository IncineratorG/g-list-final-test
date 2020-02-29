import {
  LOAD_LOCAL_SIGN_IN_INFO_BEGIN,
  LOAD_LOCAL_SIGN_IN_INFO_ERROR,
  LOAD_LOCAL_SIGN_IN_INFO_FINISHED,
  RESET_SIGN_ERRORS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_FINISHED,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_FINISHED,
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_FINISHED,
} from '../types/authenticationTypes';

const initialState = {
  currentUser: {
    signedIn: false,
    loading: false,
    phone: '',
    email: '',
    password: '',
    error: {
      hasError: false,
      description: '',
      status: '',
    },
  },
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SIGN_ERRORS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          error: {
            ...state.currentUser.error,
            hasError: false,
            description: '',
            status: '',
          },
        },
      };
    }

    case LOAD_LOCAL_SIGN_IN_INFO_BEGIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
          error: {
            ...state.currentUser.error,
            hasError: false,
            description: '',
            status: '',
          },
        },
      };
    }

    case LOAD_LOCAL_SIGN_IN_INFO_FINISHED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          signedIn: action.payload.phone ? true : false,
          phone: action.payload.phone ? action.payload.phone : '',
          email: action.payload.email ? action.payload.email : '',
          password: action.payload.password ? action.payload.password : '',
        },
      };
    }

    case LOAD_LOCAL_SIGN_IN_INFO_ERROR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          signedIn: false,
          error: {
            ...state.currentUser.error,
            hasError: true,
            description: action.payload.description
              ? action.payload.description
              : '',
            status: action.payload.status ? action.payload.status : '',
          },
        },
      };
    }

    case SIGN_UP_BEGIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          signedIn: false,
          loading: true,
          phone: '',
          email: '',
          password: '',
          error: {
            ...state.currentUser.error,
            hasError: false,
            description: '',
            status: '',
          },
        },
      };
    }

    case SIGN_UP_FINISHED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          signedIn: true,
          loading: false,
          phone: action.payload.phone,
          email: action.payload.email,
          password: action.payload.password,
          error: {
            ...state.currentUser.error,
            hasError: false,
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
          signedIn: false,
          loading: false,
          phone: '',
          email: '',
          password: '',
          error: {
            ...state.currentUser.error,
            hasError: true,
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
          signedIn: false,
          loading: true,
          phone: '',
          email: '',
          password: '',
          error: {
            ...state.currentUser.error,
            hasError: false,
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
          signedIn: true,
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
          signedIn: false,
          phone: '',
          email: '',
          password: '',
          error: {
            hasError: true,
            description: action.payload.description
              ? action.payload.description
              : '',
            status: action.payload.status ? action.payload.status : '',
          },
        },
      };
    }

    case SIGN_OUT_BEGIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: true,
        },
      };
    }

    case SIGN_OUT_FINISHED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          signedIn: false,
          phone: '',
          email: '',
          password: '',
        },
      };
    }

    case SIGN_OUT_ERROR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loading: false,
          signedIn: true,
          error: {
            hasError: true,
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
