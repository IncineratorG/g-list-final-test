import {
  ADD_PRODUCT,
  CREATE_SHOPPING_LIST,
  LOAD_CLASSES,
  LOAD_UNITS,
  REMOVE_SHOPPING_LIST_BEGIN,
  REMOVE_SHOPPING_LIST_ERROR,
  REMOVE_SHOPPING_LIST_FINISHED,
  SET_PRODUCT_STATUS,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
  SUBSCRIBE_TO_SHOPPING_LIST_BEGIN,
  SUBSCRIBE_TO_SHOPPING_LIST_ERROR,
  SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
  UPDATE_LIST_OF_SHOPPING_LISTS,
  UPDATE_SHOPPING_LIST,
} from '../types/shoppingListTypes';

const initialState = {
  units: [],
  classes: [],
  allShoppingLists: {
    unsubscribeHandler: undefined,
    loading: true,
    removing: false,
    error: '',
    data: [],
  },
  currentShoppingList: {
    unsubscribeHandler: undefined,
    loading: true,
    error: '',
    id: undefined,
    name: '',
    shared: false,
    creator: '',
    products: [],
  },
};

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHOPPING_LIST: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          id: action.payload.shoppingListId,
          name: action.payload.name,
          products: [],
        },
      };
    }

    case REMOVE_SHOPPING_LIST_BEGIN: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: true,
        },
      };
    }

    case REMOVE_SHOPPING_LIST_FINISHED: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: false,
        },
      };
    }

    case REMOVE_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: false,
        },
      };
    }

    case LOAD_UNITS: {
      return {...state, units: action.payload};
    }

    case LOAD_CLASSES: {
      return {...state, classes: action.payload};
    }

    case ADD_PRODUCT: {
      return {...state};
    }

    case SET_PRODUCT_STATUS: {
      return {...state};
    }

    case SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          loading: true,
          error: '',
          unsubscribeHandler: undefined,
        },
      };
    }

    case SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          loading: false,
          error: '',
          unsubscribeHandler: action.payload.unsubscribe,
          data: [...action.payload.listOfShoppingLists],
        },
      };
    }

    case SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          loading: false,
          error: action.payload ? action.payload : '',
          data: [],
        },
      };
    }

    case UPDATE_LIST_OF_SHOPPING_LISTS: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          data: [...action.payload],
        },
      };
    }

    case SUBSCRIBE_TO_SHOPPING_LIST_BEGIN: {
      if (state.currentShoppingList.unsubscribeHandler) {
        state.currentShoppingList.unsubscribeHandler();
      }

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          unsubscribeHandler: undefined,
          loading: true,
          error: '',
          id: undefined,
          name: '',
          products: [],
        },
      };
    }

    case SUBSCRIBE_TO_SHOPPING_LIST_FINISHED: {
      if (state.currentShoppingList.unsubscribeHandler) {
        state.currentShoppingList.unsubscribeHandler();
      }

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          unsubscribeHandler: action.payload.unsubscribe,
          loading: false,
          error: '',
          id: action.payload.shoppingList.id,
          name: action.payload.shoppingList.name,
          shared: action.payload.shoppingList.shared ? true : false,
          creator: action.payload.shoppingList.creator
            ? action.payload.shoppingList.creator
            : '',
          products: [...action.payload.shoppingList.productsList],
        },
      };
    }

    case SUBSCRIBE_TO_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          loading: false,
          error: action.payload ? action.payload : '',
        },
      };
    }

    case UPDATE_SHOPPING_LIST: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          id: action.payload.shoppingList.id,
          name: action.payload.shoppingList.name,
          products: [...action.payload.shoppingList.productsList],
        },
      };
    }

    default: {
      return state;
    }
  }
};
