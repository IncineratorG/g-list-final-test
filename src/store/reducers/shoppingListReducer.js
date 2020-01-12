import {
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS,
} from '../types/shoppingListTypes';

const initialState = {
  allShoppingLists: [],
  currentShoppingListId: undefined,
};

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SHOPPING_LISTS: {
      return {...state, allShoppingLists: action.payload};
    }

    case CREATE_SHOPPING_LIST: {
      return {...state, currentShoppingListId: action.payload};
    }

    default: {
      return state;
    }
  }
};
