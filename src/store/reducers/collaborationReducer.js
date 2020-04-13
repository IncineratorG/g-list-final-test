import {
  CHECK_USER_EXISTENCE_BEGIN,
  CHECK_USER_EXISTENCE_ERROR,
  CHECK_USER_EXISTENCE_FINISH,
  CLEAR_POTENTIAL_COLLABORATOR_DATA,
  SEND_TEXT_MESSAGE_BEGIN,
  SEND_TEXT_MESSAGE_ERROR,
  SEND_TEXT_MESSAGE_FINISH,
} from '../types/collaborationTypes';

const initialState = {
  potentialCollaborator: {
    phone: '',
    email: '',
    checking: false,
    exist: false,
    error: {
      hasError: false,
      description: '',
    },
  },
};

export const collaborationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_POTENTIAL_COLLABORATOR_DATA: {
      return {
        ...state,
        potentialCollaborator: {
          phone: '',
          email: '',
          checking: false,
          exist: false,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case CHECK_USER_EXISTENCE_BEGIN: {
      return {
        ...state,
        potentialCollaborator: {
          ...state.potentialCollaborator,
          phone: '',
          email: '',
          checking: true,
          exist: false,
          error: {
            ...state.potentialCollaborator.error,
            hasError: false,
            description: '',
          },
        },
      };
    }

    case CHECK_USER_EXISTENCE_FINISH: {
      return {
        ...state,
        potentialCollaborator: {
          phone: action.payload.phone,
          email: action.payload.email,
          checking: false,
          exist: action.payload.exist,
          error: {
            ...state.potentialCollaborator.error,
            hasError: false,
            description: '',
          },
        },
      };
    }

    case CHECK_USER_EXISTENCE_ERROR: {
      return {
        ...state,
        potentialCollaborator: {
          phone: '',
          email: '',
          checking: false,
          exist: false,
          error: {
            ...state.potentialCollaborator.error,
            hasError: true,
            description: action.payload.description
              ? action.payload.description
              : '',
          },
        },
      };
    }

    case SEND_TEXT_MESSAGE_BEGIN: {
      return {...state};
    }

    case SEND_TEXT_MESSAGE_FINISH: {
      return {...state};
    }

    case SEND_TEXT_MESSAGE_ERROR: {
      return {...state};
    }

    default: {
      return state;
    }
  }
};
