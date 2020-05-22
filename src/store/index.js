import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {shoppingListReducer} from './reducers/shoppingListReducer';
import {authenticationReducer} from './reducers/authenticationReducer';
import {collaborationReducer} from './reducers/collaborationReducer';
import {systemReducer} from './reducers/systemReducer';

const reducers = combineReducers({
  shoppingList: shoppingListReducer,
  authentication: authenticationReducer,
  collaboration: collaborationReducer,
  system: systemReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
