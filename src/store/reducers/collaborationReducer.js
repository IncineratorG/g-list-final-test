import {
  ADD_COLLABORATOR,
  LOAD_COLLABORATORS,
  SET_COLLABORATOR_ERROR,
  SET_COLLABORATOR_EXIST_STATUS,
  SET_COLLABORATOR_PENDING,
  SET_COLLABORATOR_SELECTED,
  SET_COLLABORATOR_UNSELECTED,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';

const initialState = {
  localCollaborators: [],
  // selectedCollaboratorsIds: [],
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

    // case CLEAR_SELECTED_COLLABORATORS: {
    //   return {
    //     ...state,
    //     // selectedCollaboratorsIds: [],
    //   };
    // }

    // case SELECT_COLLABORATOR: {
    //   const selectedCollaborators = state.selectedCollaboratorsIds.slice(0);
    //   selectedCollaborators.push(action.payload);
    //
    //   return {
    //     ...state,
    //     // selectedCollaboratorsIds: selectedCollaborators,
    //   };
    // }

    // case UNSELECT_COLLABORATOR: {
    //   const selectedCollaborators = state.selectedCollaboratorsIds.filter(
    //     collaboratorId => collaboratorId !== action.payload,
    //   );
    //
    //   return {
    //     ...state,
    //     // selectedCollaboratorsIds: selectedCollaborators,
    //   };
    // }

    case SET_COLLABORATOR_PENDING: {
      const collaboratorId = action.payload;

      const collaborators = state.localCollaborators.map(collaborator => {
        if (collaborator.id === collaboratorId) {
          collaborator.pending = true;
          collaborator.selected = false;
          collaborator.error = false;
        }

        return collaborator;
      });

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    case SET_COLLABORATOR_SELECTED: {
      const collaboratorId = action.payload;

      const collaborators = state.localCollaborators.map(collaborator => {
        if (collaborator.id === collaboratorId) {
          collaborator.pending = false;
          collaborator.selected = true;
          collaborator.error = false;
        }

        return collaborator;
      });

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    case SET_COLLABORATOR_UNSELECTED: {
      const collaboratorId = action.payload;

      const collaborators = state.localCollaborators.map(collaborator => {
        if (collaborator.id === collaboratorId) {
          collaborator.pending = false;
          collaborator.selected = false;
          collaborator.error = false;
        }

        return collaborator;
      });

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    case SET_COLLABORATOR_ERROR: {
      const collaboratorId = action.payload;

      const collaborators = state.localCollaborators.map(collaborator => {
        if (collaborator.id === collaboratorId) {
          collaborator.pending = false;
          collaborator.selected = false;
          collaborator.error = true;
        }

        return collaborator;
      });

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    default: {
      return state;
    }
  }
};
