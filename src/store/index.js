import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {shoppingListReducer} from './reducers/shoppingListReducer';

const reducers = combineReducers({
  shoppingList: shoppingListReducer,
});

export default createStore(reducers, applyMiddleware(thunk));
