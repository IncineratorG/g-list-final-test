import {
  ADD_PRODUCT,
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS,
  LOAD_CLASSES,
  LOAD_SHOPPING_LIST,
  LOAD_UNITS,
} from '../types/shoppingListTypes';

const initialState = {
  units: [],
  classes: [],
  allShoppingLists: [],
  currentShoppingList: {
    id: undefined,
    name: '',
    products: [],
  },
};

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SHOPPING_LISTS: {
      return {...state, allShoppingLists: action.payload};
    }

    case CREATE_SHOPPING_LIST: {
      return {
        ...state,
        allShoppingLists: action.payload.shoppingLists,
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

    case LOAD_SHOPPING_LIST: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          id: action.payload.shoppingListId,
          name: action.payload.shoppingListName,
          products: action.payload.productsList,
        },
      };
    }

    default: {
      return state;
    }
  }
};
