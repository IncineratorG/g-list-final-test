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
  REMOVE_PRODUCT_BEGIN,
  REMOVE_PRODUCT_FINISHED,
  REMOVE_PRODUCT_ERROR,
  SET_SEND_LISTS_LOADING,
  SET_RECEIVED_LISTS_LOADING,
  SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
} from '../types/shoppingListTypes';
import {Storage} from '../../services/storage/Storage';
import {StorageIdResolver} from '../../services/storage/StorageIdResolver';
import {Collaboration} from '../../services/collaboration/Collaboration';
import awaitAsyncGenerator from '@babel/runtime/helpers/esm/awaitAsyncGenerator';

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

export const subscribeToSharedListOfShoppingListsLoadingStatus = () => {
  return async dispatch => {
    const sendListsLoadingHandler = () => {
      dispatch({type: SET_SEND_LISTS_LOADING, payload: true});
    };
    const sendListsLoadedHandler = () => {
      dispatch({type: SET_SEND_LISTS_LOADING, payload: false});
    };
    const receivedListsLoadingHandler = () => {
      dispatch({type: SET_RECEIVED_LISTS_LOADING, payload: true});
    };
    const receivedListsLoadedHandler = () => {
      dispatch({type: SET_RECEIVED_LISTS_LOADING, payload: false});
    };

    const sendListsLoadingSubscription = await Storage.subscribe({
      event: Storage.events.SEND_LIST_OF_SHOPPING_LISTS_LOADING,
      handler: sendListsLoadingHandler,
    });
    const sendListsLoadedSubscription = await Storage.subscribe({
      event: Storage.events.SEND_LIST_OF_SHOPPING_LISTS_LOADED,
      handler: sendListsLoadedHandler,
    });
    const receivedListsLoadingSubscription = await Storage.subscribe({
      event: Storage.events.RECEIVED_LIST_OF_SHOPPING_LISTS_LOADING,
      handler: receivedListsLoadingHandler,
    });
    const receivedListsLoadedSubscription = await Storage.subscribe({
      event: Storage.events.RECEIVED_LIST_OF_SHOPPING_LISTS_LOADED,
      handler: receivedListsLoadedHandler,
    });

    const unsubscribeHandlers = [
      sendListsLoadingSubscription.unsubscribe,
      sendListsLoadedSubscription.unsubscribe,
      receivedListsLoadingSubscription.unsubscribe,
      receivedListsLoadedSubscription.unsubscribe,
    ];

    dispatch({
      type: SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
      payload: {unsubscribeHandlers},
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
      const {listType, canRemove} = await Storage.removeShoppingList({
        shoppingListId: id,
      });

      if (listType === StorageIdResolver.listTypes.FIREBASE && canRemove) {
        await Collaboration.removeSharedShoppingList({shoppingListId: id});
      }

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
  editor,
  shoppingListId,
  name,
  quantity,
  unitId,
  note,
  classId,
}) => {
  return async dispatch => {
    try {
      const {listType, firebaseUpdateData} = await Storage.addProduct({
        shoppingListId,
        name,
        quantity,
        unitId,
        note,
        classId,
      });

      dispatch({type: ADD_PRODUCT});

      if (listType === StorageIdResolver.listTypes.FIREBASE) {
        const {
          completedItemsCount,
          totalItemsCount,
          product,
        } = firebaseUpdateData;

        const successful = await Collaboration.addProduct({
          editor,
          shoppingListId,
          product,
          completedItemsCount,
          totalItemsCount,
        });

        if (!successful) {
          dispatch(
            removeProduct({editor, shoppingListId, productId: product.id}),
          );
        }
      }
    } catch (e) {
      console.log('shoppingListActions->addProduct() ERROR: ' + e);
    }
  };
};

export const setProductStatus = ({
  editor,
  shoppingListId,
  productId,
  status,
}) => {
  return async dispatch => {
    try {
      const {listType, firebaseUpdateData} = await Storage.setProductStatus({
        shoppingListId,
        productId,
        status,
      });

      dispatch({type: SET_PRODUCT_STATUS});

      if (listType === StorageIdResolver.listTypes.FIREBASE) {
        const {completedItemsCount, totalItemsCount} = firebaseUpdateData;

        await Collaboration.setProductStatus({
          editor,
          shoppingListId,
          productId,
          status,
          completedItemsCount,
          totalItemsCount,
        });
      }
    } catch (e) {
      console.log('shoppingListActions->setProductStatus() ERROR: ' + e);
    }
  };
};

export const removeProduct = ({editor, shoppingListId, productId}) => {
  return async dispatch => {
    dispatch({type: REMOVE_PRODUCT_BEGIN});

    try {
      const {listType, firebaseUpdateData} = await Storage.removeProduct({
        shoppingListId,
        productId,
      });

      dispatch({type: REMOVE_PRODUCT_FINISHED});

      if (listType === StorageIdResolver.listTypes.FIREBASE) {
        const {completedItemsCount, totalItemsCount} = firebaseUpdateData;

        await Collaboration.removeProduct({
          editor,
          shoppingListId,
          productId,
          completedItemsCount,
          totalItemsCount,
        });
      }
    } catch (e) {
      console.log('shoppingListActions->removeProduct() ERROR: ' + e);
      dispatch({type: REMOVE_PRODUCT_ERROR});
    }
  };
};
