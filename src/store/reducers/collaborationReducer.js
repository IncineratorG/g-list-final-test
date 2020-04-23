const initialState = {
  localCollaborators: [],
};

export const collaborationReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

// export const collaborationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CLEAR_POTENTIAL_COLLABORATOR_DATA: {
//       return {
//         ...state,
//         potentialCollaborator: {
//           phone: '',
//           email: '',
//           checking: false,
//           exist: false,
//           error: {
//             hasError: false,
//             description: '',
//           },
//         },
//       };
//     }
//
//     case CHECK_USER_EXISTENCE_BEGIN: {
//       return {
//         ...state,
//         potentialCollaborator: {
//           ...state.potentialCollaborator,
//           phone: '',
//           email: '',
//           checking: true,
//           exist: false,
//           error: {
//             ...state.potentialCollaborator.error,
//             hasError: false,
//             description: '',
//           },
//         },
//       };
//     }
//
//     case CHECK_USER_EXISTENCE_FINISH: {
//       return {
//         ...state,
//         potentialCollaborator: {
//           phone: action.payload.phone,
//           email: action.payload.email,
//           checking: false,
//           exist: action.payload.exist,
//           error: {
//             ...state.potentialCollaborator.error,
//             hasError: false,
//             description: '',
//           },
//         },
//       };
//     }
//
//     case CHECK_USER_EXISTENCE_ERROR: {
//       return {
//         ...state,
//         potentialCollaborator: {
//           phone: '',
//           email: '',
//           checking: false,
//           exist: false,
//           error: {
//             ...state.potentialCollaborator.error,
//             hasError: true,
//             description: action.payload.description
//               ? action.payload.description
//               : '',
//           },
//         },
//       };
//     }
//
//     case SEND_TEXT_MESSAGE_BEGIN: {
//       return {...state};
//     }
//
//     case SEND_TEXT_MESSAGE_FINISH: {
//       return {...state};
//     }
//
//     case SEND_TEXT_MESSAGE_ERROR: {
//       return {...state};
//     }
//
//     default: {
//       return state;
//     }
//   }
// };
