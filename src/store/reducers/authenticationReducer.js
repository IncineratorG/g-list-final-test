import {
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
  SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_BEGIN,
  SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_ERROR,
  SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_FINISHED,
  UPDATE_LOCAL_SIGN_IN_INFO,
} from '../types/authenticationTypes';

const initialState = {
  currentUser: {
    unsubscribeHandler: undefined,
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
    case SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_BEGIN: {
      if (state.currentUser.unsubscribeHandler) {
        state.currentUser.unsubscribeHandler();
      }

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

    case SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_FINISHED: {
      if (state.currentUser.unsubscribeHandler) {
        state.currentUser.unsubscribeHandler();
      }

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          unsubscribeHandler: action.payload.unsubscribe,
          signedIn: action.payload.signInInfo.phone ? true : false,
          loading: false,
          phone: action.payload.signInInfo.phone
            ? action.payload.signInInfo.phone
            : '',
          email: action.payload.signInInfo.email
            ? action.payload.signInInfo.email
            : '',
          password: action.payload.signInInfo.password
            ? action.payload.signInInfo.password
            : '',
        },
      };
    }

    case SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_ERROR: {
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

    case UPDATE_LOCAL_SIGN_IN_INFO: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          signedIn: action.payload.phone ? true : false,
          phone: action.payload.phone,
          email: action.payload.email,
          password: action.payload.password,
        },
      };
    }

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
          loading: false,
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
          loading: false,
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
