import {
  ADD_COLLABORATOR,
  CLEAR_SELECTED_COLLABORATORS,
  LOAD_COLLABORATORS,
  SELECT_COLLABORATOR,
  SET_COLLABORATOR_EXIST_STATUS,
  UNSELECT_COLLABORATOR,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';

const initialState = {
  localCollaborators: [],
  selectedCollaboratorsIds: [],
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
          if (status === Collaboration.collaboratorStatus.NOT_EXIST) {
            collaborator.id = collaborator.id + Date.now().toString();
          }
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

    case CLEAR_SELECTED_COLLABORATORS: {
      return {
        ...state,
        selectedCollaboratorsIds: [],
      };
    }

    case SELECT_COLLABORATOR: {
      const selectedCollaborators = state.selectedCollaboratorsIds.slice(0);
      selectedCollaborators.push(action.payload);

      return {
        ...state,
        selectedCollaboratorsIds: selectedCollaborators,
      };
    }

    case UNSELECT_COLLABORATOR: {
      const selectedCollaborators = state.selectedCollaboratorsIds.filter(
        collaboratorId => collaboratorId !== action.payload,
      );

      return {
        ...state,
        selectedCollaboratorsIds: selectedCollaborators,
      };
    }

    default: {
      return state;
    }
  }
};
