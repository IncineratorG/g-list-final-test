import {
  ADD_PRODUCT,
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS,
  LOAD_CLASSES,
  LOAD_UNITS,
} from '../types/shoppingListTypes';

const initialState = {
  units: [],
  classes: [],
  allShoppingLists: [],
  currentShoppingListId: undefined,
  currentShoppingListItems: [],
};

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SHOPPING_LISTS: {
      return {...state, allShoppingLists: action.payload};
    }

    case CREATE_SHOPPING_LIST: {
      return {...state, currentShoppingListId: action.payload};
    }

    case LOAD_UNITS: {
      return {...state, units: action.payload};
    }

    case ADD_PRODUCT: {
      return {...state, currentShoppingListItems: action.payload};
    }

    case LOAD_CLASSES: {
      return {...state, classes: action.payload};
    }

    default: {
      return state;
    }
  }
};
