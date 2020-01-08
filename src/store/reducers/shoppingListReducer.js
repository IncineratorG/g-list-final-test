import {LOAD_ALL_SHOPPING_LISTS} from '../types/shoppingListTypes';

const initialState = {
  allShoppingLists: [],
};

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SHOPPING_LISTS: {
      return {...state, allShoppingLists: action.payload};
    }

    default: {
      return state;
    }
  }
};
