import {
  SL_REMOVE_SHOPPING_LIST_BEGIN,
  SL_REMOVE_SHOPPING_LIST_ERROR,
  SL_REMOVE_SHOPPING_LIST_FINISHED,
  SL_SET_RECEIVED_LISTS_LOADING,
  SL_SET_SEND_LISTS_LOADING,
  SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN,
  SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR,
  SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
  SL_SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
  SL_UNSUBSCRIBE_FROM_LIST_OF_SHOPPING_LISTS,
  SL_UNSUBSCRIBE_FROM_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
  SL_UPDATE_LIST_OF_SHOPPING_LISTS,
} from '../types/shoppingListsTypes';

const initialState = {
  allShoppingLists: {
    unsubscribeHandler: undefined,
    sharedListsLoadingStatusUnsubscribeHandlers: [],
    sendListsLoading: false,
    receivedListsLoading: false,
    sharedListsLoading: false,
    // sendListsLoading: true,
    // receivedListsLoading: true,
    // sharedListsLoading: true,
    localListsLoading: true,
    removing: false,
    error: '',
    allLists: [],
    sharedLists: [],
    localLists: [],
  },
};

export const shoppingListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          localListsLoading: true,
          receivedListsLoading: true,
          sendListsLoading: true,
          error: '',
          unsubscribeHandler: undefined,
        },
      };
    }

    case SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      const allLists = action.payload.listOfShoppingLists.sort(
        (l1, l2) => l1.createTimestamp < l2.createTimestamp,
      );

      const sharedLists = [];
      const localLists = [];
      allLists.forEach(list => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          localListsLoading: false,
          error: '',
          unsubscribeHandler: action.payload.unsubscribe,
          allLists: [...allLists],
          sharedLists: [...sharedLists],
          localLists: [...localLists],
        },
      };
    }

    case SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          localListsLoading: false,
          error: action.payload ? action.payload : '',
          allLists: [],
        },
      };
    }

    case SL_UPDATE_LIST_OF_SHOPPING_LISTS: {
      console.log('UPDATE_LIST_OF_SHOPPING_LISTS');

      const allLists = action.payload.sort(
        (l1, l2) => l1.createTimestamp < l2.createTimestamp,
      );

      const sharedLists = [];
      const localLists = [];
      allLists.forEach(list => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          allLists: [...action.payload],
          sharedLists: [...sharedLists],
          localLists: [...localLists],
        },
      };
    }

    case SL_UNSUBSCRIBE_FROM_LIST_OF_SHOPPING_LISTS: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          unsubscribeHandler: undefined,
        },
      };
    }

    case SL_SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS: {
      if (state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers) {
        state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers.forEach(
          unsubscribeFunc => {
            unsubscribeFunc();
          },
        );
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          sharedListsLoadingStatusUnsubscribeHandlers: [
            ...action.payload.unsubscribeHandlers,
          ],
        },
      };
    }

    case SL_SET_SEND_LISTS_LOADING: {
      const receivedListsLoading = state.allShoppingLists.receivedListsLoading;
      const sendListsLoading = action.payload;
      const sharedListsLoading = receivedListsLoading || sendListsLoading;

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          sendListsLoading: action.payload,
          sharedListsLoading: sharedListsLoading,
        },
      };
    }

    case SL_SET_RECEIVED_LISTS_LOADING: {
      const sendListsLoading = state.allShoppingLists.sendListsLoading;
      const receivedListsLoading = action.payload;
      const sharedListsLoading = receivedListsLoading || sendListsLoading;

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          receivedListsLoading: action.payload,
          sharedListsLoading: sharedListsLoading,
        },
      };
    }

    case SL_UNSUBSCRIBE_FROM_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS: {
      if (state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers) {
        state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers.forEach(
          unsubscribeFunc => {
            unsubscribeFunc();
          },
        );
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          sharedListsLoadingStatusUnsubscribeHandlers: [],
        },
      };
    }

    case SL_REMOVE_SHOPPING_LIST_BEGIN: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: true,
        },
      };
    }

    case SL_REMOVE_SHOPPING_LIST_FINISHED: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: false,
        },
      };
    }

    case SL_REMOVE_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};
