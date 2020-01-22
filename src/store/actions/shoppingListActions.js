import {
  ADD_PRODUCT,
  CREATE_SHOPPING_LIST,
  LOAD_ALL_SHOPPING_LISTS_BEGIN,
  LOAD_ALL_SHOPPING_LISTS_ERROR,
  LOAD_ALL_SHOPPING_LISTS_FINISHED,
  LOAD_CLASSES,
  LOAD_SHOPPING_LIST_BEGIN,
  LOAD_SHOPPING_LIST_ERROR,
  LOAD_SHOPPING_LIST_FINISHED,
  LOAD_UNITS,
} from '../types/shoppingListTypes';
import {Storage} from '../../services/storage/Storage';

export const loadAllShoppingLists = () => {
  return async dispatch => {
    dispatch({type: LOAD_ALL_SHOPPING_LISTS_BEGIN});

    try {
      const shoppingLists = await Storage.getAllShoppingLists();

      dispatch({
        type: LOAD_ALL_SHOPPING_LISTS_FINISHED,
        payload: shoppingLists,
      });
    } catch (e) {
      dispatch({type: LOAD_ALL_SHOPPING_LISTS_ERROR, payload: e});
    }
  };
};

export const createShoppingList = listName => async dispatch => {
  let shoppingListId = -1;
  let shoppingLists = [];

  try {
    shoppingListId = await Storage.createShoppingList({listName: listName});
    shoppingLists = await Storage.getAllShoppingLists();
  } catch (e) {
    console.log('shoppingListActions->createShoppingList() ERROR: ' + e);
  }

  dispatch({
    type: CREATE_SHOPPING_LIST,
    payload: {
      shoppingListId: shoppingListId,
      name: listName,
      shoppingLists: shoppingLists,
    },
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

export const loadClasses = () => {
  return async dispatch => {
    let classes = [];
    try {
      classes = await Storage.getClasses();
    } catch (e) {
      console.log('shoppingListActions->loadClasses() ERROR: ' + e);
    }

    dispatch({type: LOAD_CLASSES, payload: classes});
  };
};

export const addProduct = ({
  shoppingListId,
  name,
  quantity,
  unitId,
  note,
  classId,
}) => {
  return async dispatch => {
    let productsList = [];

    try {
      await Storage.addProduct({
        shoppingListId,
        name,
        quantity,
        unitId,
        note,
        classId,
      });

      productsList = await Storage.getProductsList(shoppingListId);
    } catch (e) {
      console.log('shoppingListActions->addProduct() ERROR: ' + e);
    }

    dispatch({type: ADD_PRODUCT, payload: productsList});
  };
};

export const loadShoppingList = id => {
  return async dispatch => {
    dispatch({type: LOAD_SHOPPING_LIST_BEGIN});

    try {
      const productsList = await Storage.getProductsList(id);
      const shoppingListName = await Storage.getShoppingListName(id);

      dispatch({
        type: LOAD_SHOPPING_LIST_FINISHED,
        payload: {
          shoppingListId: id,
          shoppingListName: shoppingListName,
          productsList: productsList,
        },
      });
    } catch (e) {
      console.log('shoppingListActions->loadShoppingList() ERROR: ' + e);

      dispatch({type: LOAD_SHOPPING_LIST_ERROR, payload: e});
    }
  };
};
