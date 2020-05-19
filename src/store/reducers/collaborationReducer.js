import {
  ADD_COLLABORATOR,
  LOAD_COLLABORATORS,
  SET_BUSY,
  SET_COLLABORATOR_ERROR,
  SET_COLLABORATOR_EXIST_STATUS,
  SET_COLLABORATOR_PENDING,
  SET_COLLABORATOR_SELECTED,
  SET_COLLABORATOR_UNSELECTED,
  SUBSCRIBE_TO_CURRENT_SHOPPING_LIST_RECEIVERS,
  UNSUBSCRIBE_FROM_CURRENT_SHOPPING_LIST_RECEIVERS,
  UPDATE_RECEIVERS,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';

const initialState = {
  localCollaborators: [],
  receivers: [],
  receiversUnsubscribeHandler: undefined,
  busy: false,
};

export const collaborationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_TO_CURRENT_SHOPPING_LIST_RECEIVERS: {
      if (state.receiversUnsubscribeHandler) {
        state.receiversUnsubscribeHandler();
      }

      const listData = action.payload.listOfShoppingLists.filter(
        list => list.id === action.payload.id,
      );

      let listReceivers = [];
      if (listData.length) {
        const {receivers} = listData[0];
        if (receivers && receivers.length) {
          listReceivers = [...receivers];
        }
      }

      return {
        ...state,
        receivers: [...listReceivers],
        receiversUnsubscribeHandler: action.payload.unsubscribe,
      };
    }

    case UNSUBSCRIBE_FROM_CURRENT_SHOPPING_LIST_RECEIVERS: {
      if (state.receiversUnsubscribeHandler) {
        state.receiversUnsubscribeHandler();
      }

      return {
        ...state,
        receiversUnsubscribeHandler: undefined,
      };
    }

    case UPDATE_RECEIVERS: {
      const listData = action.payload.listOfShoppingLists.filter(
        list => list.id === action.payload.id,
      );

      let listReceivers = [];
      if (listData.length) {
        const {receivers} = listData[0];
        if (receivers && receivers.length) {
          listReceivers = [...receivers];
        }
      }

      return {
        ...state,
        receivers: [...listReceivers],
      };
    }

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
          collaborator.forceSelected = true;
          collaborator.forceUnselected = false;
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
          collaborator.forceSelected = false;
          collaborator.forceUnselected = true;
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
          collaborator.forceSelected = false;
          collaborator.forceUnselected = false;
        }

        return collaborator;
      });

      return {
        ...state,
        localCollaborators: collaborators,
      };
    }

    case SET_BUSY: {
      return {
        ...state,
        busy: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
