import {
  ADD_PRODUCT,
  CREATE_SHOPPING_LIST,
  LOAD_CLASSES,
  LOAD_UNITS,
  SET_PRODUCT_STATUS,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
  UPDATE_LIST_OF_SHOPPING_LISTS,
  SUBSCRIBE_TO_SHOPPING_LIST_BEGIN,
  SUBSCRIBE_TO_SHOPPING_LIST_ERROR,
  SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
  UPDATE_SHOPPING_LIST,
  REMOVE_SHOPPING_LIST_BEGIN,
  REMOVE_SHOPPING_LIST_FINISHED,
  REMOVE_SHOPPING_LIST_ERROR,
} from '../types/shoppingListTypes';
import {Storage} from '../../services/storage/Storage';

export const loadUnits = ({shoppingListId}) => {
  return async dispatch => {
    let units = [];
    try {
      units = await Storage.getUnits({shoppingListId});
    } catch (e) {
      console.log('shoppingListActions->loadUnits() ERROR: ' + e);
    }

    dispatch({
      type: LOAD_UNITS,
      payload: units,
    });
  };
};

export const loadClasses = ({shoppingListId}) => {
  return async dispatch => {
    let classes = [];
    try {
      classes = await Storage.getClasses({shoppingListId});
    } catch (e) {
      console.log('shoppingListActions->loadClasses() ERROR: ' + e);
    }

    dispatch({type: LOAD_CLASSES, payload: classes});
  };
};

export const subscribeToListOfShoppingLists = () => {
  return async dispatch => {
    dispatch({type: SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN});

    try {
      const listOfShoppingListsChangedHandler = listOfShoppingLists => {
        dispatch({
          type: UPDATE_LIST_OF_SHOPPING_LISTS,
          payload: listOfShoppingLists,
        });
      };

      const subscription = await Storage.subscribe({
        event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
        handler: listOfShoppingListsChangedHandler,
      });

      dispatch({
        type: SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
        payload: {
          unsubscribe: subscription.unsubscribe,
          listOfShoppingLists: subscription.data,
        },
      });
    } catch (e) {
      dispatch({type: SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR, payload: e});
    }
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
    payload: {
      shoppingListId: shoppingListId,
      name: listName,
    },
  });

  dispatch(subscribeToShoppingList(shoppingListId));
};

export const removeShoppingList = id => {
  return async dispatch => {
    dispatch({type: REMOVE_SHOPPING_LIST_BEGIN});

    try {
      const {listType} = await Storage.removeShoppingList({shoppingListId: id});

      console.log('LIST_TYPE: ' + listType);

      dispatch({type: REMOVE_SHOPPING_LIST_FINISHED, payload: id});
    } catch (e) {
      console.log('shoppingListActions->removeShoppingList() ERROR: ' + e);
      dispatch({type: REMOVE_SHOPPING_LIST_ERROR});
    }
  };
};

export const subscribeToShoppingList = shoppingListId => {
  return async dispatch => {
    dispatch({type: SUBSCRIBE_TO_SHOPPING_LIST_BEGIN});

    try {
      const shoppingListChangedHandler = shoppingList => {
        dispatch({type: UPDATE_SHOPPING_LIST, payload: {shoppingList}});
      };

      const subscription = await Storage.subscribe({
        shoppingListId,
        event: Storage.events.SHOPPING_LIST_CHANGED,
        handler: shoppingListChangedHandler,
      });

      dispatch({
        type: SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
        payload: {
          unsubscribe: subscription.unsubscribe,
          shoppingList: subscription.data,
        },
      });
    } catch (e) {
      dispatch({type: SUBSCRIBE_TO_SHOPPING_LIST_ERROR, payload: e});
    }
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
    try {
      await Storage.addProduct({
        shoppingListId,
        name,
        quantity,
        unitId,
        note,
        classId,
      });

      dispatch({type: ADD_PRODUCT});
    } catch (e) {
      console.log('shoppingListActions->addProduct() ERROR: ' + e);
    }
  };
};

export const setProductStatus = (shoppingListId, productId, status) => {
  return async dispatch => {
    try {
      await Storage.setProductStatus({
        shoppingListId,
        productId,
        status,
      });
      dispatch({type: SET_PRODUCT_STATUS});
    } catch (e) {
      console.log('shoppingListActions->setProductStatus() ERROR: ' + e);
    }
  };
};
