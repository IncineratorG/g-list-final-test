import {
  ADD_PRODUCT,
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS_BEGIN,
  LOAD_ALL_SHOPPING_LISTS_ERROR,
  LOAD_ALL_SHOPPING_LISTS_FINISHED,
  LOAD_CLASSES,
  LOAD_SHOPPING_LIST_BEGIN,
  LOAD_SHOPPING_LIST_ERROR,
  LOAD_SHOPPING_LIST_FINISHED,
  LOAD_UNITS,
} from '../types/shoppingListTypes';

const initialState = {
  units: [],
  classes: [],
  allShoppingLists: {
    loading: false,
    error: '',
    data: [],
  },
  currentShoppingList: {
    loading: false,
    error: '',
    id: undefined,
    name: '',
    products: [],
  },
};

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SHOPPING_LISTS_BEGIN: {
      return {
        ...state,
        allShoppingLists: {...state.allShoppingLists, loading: true, error: ''},
      };
    }

    case LOAD_ALL_SHOPPING_LISTS_FINISHED: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          loading: false,
          data: action.payload,
          error: '',
        },
      };
    }

    case LOAD_ALL_SHOPPING_LISTS_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          loading: false,
          error: action.payload,
        },
      };
    }

    case CREATE_SHOPPING_LIST: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          loading: false,
          data: action.payload.shoppingLists,
          error: '',
        },
        currentShoppingList: {
          ...state.currentShoppingList,
          id: action.payload.shoppingListId,
          name: action.payload.name,
          products: [],
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
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: action.payload,
        },
      };
    }

    case LOAD_SHOPPING_LIST_BEGIN: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          loading: true,
          error: '',
        },
      };
    }

    case LOAD_SHOPPING_LIST_FINISHED: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          loading: false,
          error: '',
          id: action.payload.shoppingListId,
          name: action.payload.shoppingListName,
          products: action.payload.productsList,
        },
      };
    }

    case LOAD_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          loading: false,
          error: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
