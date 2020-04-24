import {
  ADD_COLLABORATOR,
  LOAD_COLLABORATORS,
  SET_COLLABORATOR_EXIST_STATUS,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';

const initialState = {
  localCollaborators: [],
};

export const collaborationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLLABORATOR: {
      const collaborators = state.localCollaborators.slice(0);
      collaborators.push(action.payload);

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    case SET_COLLABORATOR_EXIST_STATUS: {
      const collaboratorId = action.payload.id;
      const status = action.payload.status;

      const collaborators = state.localCollaborators.map(collaborator => {
        if (collaborator.id === collaboratorId) {
          collaborator.status = status;
        }
        if (status === Collaboration.collaboratorStatus.NOT_EXIST) {
          collaborator.id = collaborator.id + Date.now().toString();
        }

        return collaborator;
      });

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    case LOAD_COLLABORATORS: {
      return {
        ...state,
        localCollaborators: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
