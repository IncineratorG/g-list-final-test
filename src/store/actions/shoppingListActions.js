import {
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS,
  LOAD_UNITS,
} from '../types/shoppingListTypes';
import {Storage} from '../../services/storage/Storage';

export const loadAllShoppingLists = () => {
  return async dispatch => {
    const shoppingLists = await Storage.getAllShoppingLists();

    // const testList = [
    //   {
    //     id: '1',
    //     name: 'Список 1: вечерняя поездка в ашан 31го декабря, когда все',
    //     completionStatus: 'not-finished',
    //   },
    //   {
    //     id: '2',
    //     name:
    //       'Список 2: пятерочка на тихвинской улице за углом у которой аптека ивановских в которой находится тряпка',
    //     completionStatus: 'finished',
    //   },
    //   {id: '3', name: 'Список 3', completionStatus: 'not-finished'},
    //   {id: '4', name: 'Список 4', completionStatus: 'not-finished'},
    //   {id: '5', name: 'Список 5', completionStatus: 'not-finished'},
    //   {id: '6', name: 'Список 6', completionStatus: 'not-finished'},
    //   {id: '7', name: 'Список 7', completionStatus: 'not-finished'},
    // ];

    dispatch({
      type: LOAD_ALL_SHOPPING_LISTS,
      payload: shoppingLists,
    });
  };
};

export const createShoppingList = listName => async dispatch => {
  let shoppingListId = -1;
  try {
    shoppingListId = await Storage.createShoppingList({listName: listName});
  } catch (e) {
    console.log('shoppingListActions->createShoppingList() ERROR: ' + e);
  }

  dispatch({
    type: CREATE_SHOPPING_LIST,
    payload: shoppingListId,
  });
};

export const loadUnits = () => {
  return async dispatch => {
    let units = [];
    try {
      units = await Storage.getUnits();
    } catch (e) {
      console.log('shoppingListActions->loadUnits() ERROR: ' + e);
    }

    dispatch({
      type: LOAD_UNITS,
      payload: units,
    });
  };
};
