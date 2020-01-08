import {
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS,
} from '../types/shoppingListTypes';
import {Storage} from '../../services/storage/Storage';

export const loadAllShoppingLists = () => {
  return async dispatch => {
    let shoppingLists = await Storage.getShoppingList();
    if (!shoppingLists) {
      shoppingLists = [];
    }

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

export const createShoppingList = () => {
  return {
    type: CREATE_SHOPPING_LIST,
  };
};
