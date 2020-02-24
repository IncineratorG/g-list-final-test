import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {shoppingListReducer} from './reducers/shoppingListReducer';
import {collaborationReducer} from './reducers/collaborationReducer';

const reducers = combineReducers({
  shoppingList: shoppingListReducer,
  collaboration: collaborationReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
