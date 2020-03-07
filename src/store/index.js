import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {shoppingListReducer} from './reducers/shoppingListReducer';
import {authenticationReducer} from './reducers/authenticationReducer';
import {collaborationReducer} from './reducers/collaborationReducer';

const reducers = combineReducers({
  shoppingList: shoppingListReducer,
  authentication: authenticationReducer,
  collaboration: collaborationReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
