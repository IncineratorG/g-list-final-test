import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {shoppingListReducer} from './reducers/shoppingListReducer';
import {authenticationReducer} from './reducers/authenticationReducer';
import {collaborationReducer} from './reducers/collaborationReducer';
import {systemReducer} from './reducers/systemReducer';
import {shoppingListsReducer} from './reducers/shoppingListsReducer';
import {currentShoppingListReducer} from './reducers/currentShoppingListReducer';

const reducers = combineReducers({
  shoppingLists: shoppingListsReducer,
  currentShoppingList: currentShoppingListReducer,

  shoppingList: shoppingListReducer,
  authentication: authenticationReducer,
  collaboration: collaborationReducer,
  system: systemReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
