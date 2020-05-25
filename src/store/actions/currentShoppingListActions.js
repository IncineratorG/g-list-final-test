import {Storage} from '../../services/storage/Storage';
import {
  CSL_ADD_PRODUCT,
  CSL_ADD_PRODUCTS,
  CSL_CREATE_SHOPPING_LIST,
  CSL_DELETE_PRODUCTS,
  CSL_LOAD_CLASSES,
  CSL_LOAD_UNITS,
  CSL_REMOVE_PRODUCT_BEGIN,
  CSL_REMOVE_PRODUCT_ERROR,
  CSL_REMOVE_PRODUCT_FINISHED,
  CSL_SET_PRODUCT_STATUS_BEGIN,
  CSL_SET_PRODUCT_STATUS_ERROR,
  CSL_SET_PRODUCT_STATUS_FINISHED,
  CSL_SET_SHARED_LIST_LOADING,
  CSL_SUBSCRIBE_TO_SHARED_SHOPPING_LIST_LOADING_STATUS,
  CSL_SUBSCRIBE_TO_SHOPPING_LIST_BEGIN,
  CSL_SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
  CSL_UPDATE_PRODUCT,
  CSL_UPDATE_PRODUCTS,
} from '../types/currentShoppingListTypes';
import {StorageIdResolver} from '../../services/storage/StorageIdResolver';
import {Collaboration} from '../../services/collaboration/Collaboration';

export const csl_loadUnits = ({shoppingListId}) => {
  return async dispatch => {
    let units = [];
    try {
      units = await Storage.getUnits({shoppingListId});
    } catch (e) {
      console.log('currentShoppingListActions->loadUnits() ERROR: ' + e);
    }

    dispatch({
      type: CSL_LOAD_UNITS,
      payload: units,
    });
  };
};

export const csl_loadClasses = ({shoppingListId}) => {
  return async dispatch => {
    let classes = [];
    try {
      classes = await Storage.getClasses({shoppingListId});
    } catch (e) {
      console.log('currentShoppingListActions->loadClasses() ERROR: ' + e);
    }

    dispatch({type: CSL_LOAD_CLASSES, payload: classes});
  };
};

export const csl_createShoppingList = listName => async dispatch => {
  let shoppingListId = -1;

  try {
    shoppingListId = await Storage.createShoppingList({listName: listName});
  } catch (e) {
    console.log('currentShoppingListActions->createShoppingList() ERROR: ' + e);
  }

  dispatch({
    type: CSL_CREATE_SHOPPING_LIST,
    payload: {
      shoppingListId: shoppingListId,
      name: listName,
    },
  });

  dispatch(csl_subscribeToShoppingList(shoppingListId));
};

export const csl_subscribeToShoppingList = listId => {
  return async dispatch => {
    dispatch(csl_loadUnits({shoppingListId: listId}));
    dispatch(csl_loadClasses({shoppingListId: listId}));
    dispatch(csl_subscribeToSharedShoppingListLoadingStatus(listId));

    dispatch({type: CSL_SUBSCRIBE_TO_SHOPPING_LIST_BEGIN});

    const productsAddedHandler = ({shoppingListId, products}) => {
      dispatch({type: CSL_ADD_PRODUCTS, payload: {shoppingListId, products}});
    };
    const productsUpdatedHandler = ({shoppingListId, products}) => {
      dispatch({
        type: CSL_UPDATE_PRODUCTS,
        payload: {shoppingListId, products},
      });
    };
    const productsDeletedHandler = ({shoppingListId, products}) => {
      dispatch({
        type: CSL_DELETE_PRODUCTS,
        payload: {shoppingListId, products},
      });
    };

    const {unsubscribe: productsAddedUnsubscribe} = await Storage.subscribe({
      event: Storage.events.PRODUCTS_ADDED,
      handler: productsAddedHandler,
    });
    const {unsubscribe: productsUpdatedUnsubscribe} = await Storage.subscribe({
      event: Storage.events.PRODUCTS_UPDATED,
      handler: productsUpdatedHandler,
    });
    const {unsubscribe: productsDeletedUnsubscribe} = await Storage.subscribe({
      event: Storage.events.PRODUCTS_DELETED,
      handler: productsDeletedHandler,
    });

    const {
      unsubscribe: shoppingListChangeUnsubscribe,
      data: shoppingList,
    } = await Storage.subscribe({
      shoppingListId: listId,
      event: Storage.events.SHOPPING_LIST_CHANGED,
    });

    dispatch({
      type: CSL_SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
      payload: {
        productsAddedUnsubscribe,
        productsUpdatedUnsubscribe,
        productsDeletedUnsubscribe,
        shoppingListChangeUnsubscribe,
        shoppingList,
      },
    });
  };
};

export const csl_subscribeToSharedShoppingListLoadingStatus = shoppingListId => {
  return async dispatch => {
    const sharedListLoadingHandler = listId => {
      dispatch({type: CSL_SET_SHARED_LIST_LOADING, payload: true});
    };
    const sharedListLoaded = listId => {
      dispatch({type: CSL_SET_SHARED_LIST_LOADING, payload: false});
    };

    const sharedListLoadingSubscription = await Storage.subscribe({
      event: Storage.events.SHARED_LIST_LOADING,
      handler: sharedListLoadingHandler,
    });
    const sharedListLoadedSubscription = await Storage.subscribe({
      event: Storage.events.SHARED_LIST_LOADED,
      handler: sharedListLoaded,
    });

    const unsubscribeHandlers = [
      sharedListLoadingSubscription.unsubscribe,
      sharedListLoadedSubscription.unsubscribe,
    ];

    dispatch({
      type: CSL_SUBSCRIBE_TO_SHARED_SHOPPING_LIST_LOADING_STATUS,
      payload: {unsubscribeHandlers},
    });
  };
};

export const csl_addProduct = ({
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

      dispatch({type: CSL_ADD_PRODUCT});

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
            csl_removeProduct({editor, shoppingListId, productId: product.id}),
          );
        }
      }
    } catch (e) {
      console.log('currentShoppingListActions->addProduct() ERROR: ' + e);
    }
  };
};

export const csl_updateProduct = ({
  editor,
  shoppingListId,
  productId,
  name,
  quantity,
  unitId,
  note,
  classId,
  status,
}) => {
  return async dispatch => {
    try {
      const {listType, firebaseUpdateData} = await Storage.updateProduct({
        shoppingListId,
        productId,
        name,
        quantity,
        unitId,
        note,
        classId,
        status,
      });

      dispatch({type: CSL_UPDATE_PRODUCT});

      if (listType === StorageIdResolver.listTypes.FIREBASE) {
        const {
          completedItemsCount,
          totalItemsCount,
          product,
        } = firebaseUpdateData;

        const successful = await Collaboration.updateProduct({
          editor,
          shoppingListId,
          product,
          completedItemsCount,
          totalItemsCount,
        });
      }
    } catch (e) {
      console.log('currentShoppingListActions->updateProduct() ERROR: ' + e);
    }
  };
};

export const csl_setProductStatus = ({
  editor,
  shoppingListId,
  productId,
  status,
}) => {
  return async dispatch => {
    dispatch({
      type: CSL_SET_PRODUCT_STATUS_BEGIN,
      payload: {shoppingListId, productId, status},
    });

    try {
      const {listType, firebaseUpdateData} = await Storage.setProductStatus({
        shoppingListId,
        productId,
        status,
      });

      if (listType === StorageIdResolver.listTypes.FIREBASE) {
        const {completedItemsCount, totalItemsCount} = firebaseUpdateData;

        const success = await Collaboration.setProductStatus({
          editor,
          shoppingListId,
          productId,
          status,
          completedItemsCount,
          totalItemsCount,
        });
        if (success) {
          dispatch({
            type: CSL_SET_PRODUCT_STATUS_FINISHED,
            payload: {shoppingListId, productId, status},
          });
        } else {
          dispatch({
            type: CSL_SET_PRODUCT_STATUS_ERROR,
            payload: {
              shoppingListId,
              productId,
              status,
              error: 'BAD_FIREBASE_RESPONSE',
            },
          });
        }
      } else {
        dispatch({
          type: CSL_SET_PRODUCT_STATUS_FINISHED,
          payload: {shoppingListId, productId, status},
        });
      }
    } catch (e) {
      console.log('currentShoppingListActions->setProductStatus() ERROR: ' + e);
      dispatch({
        type: CSL_SET_PRODUCT_STATUS_ERROR,
        payload: {shoppingListId, productId, status, error: e},
      });
    }
  };
};

export const csl_removeProduct = ({editor, shoppingListId, productId}) => {
  return async dispatch => {
    dispatch({type: CSL_REMOVE_PRODUCT_BEGIN});

    try {
      const {listType, firebaseUpdateData} = await Storage.removeProduct({
        shoppingListId,
        productId,
      });

      dispatch({type: CSL_REMOVE_PRODUCT_FINISHED});

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
      console.log('currentShoppingListActions->removeProduct() ERROR: ' + e);
      dispatch({type: CSL_REMOVE_PRODUCT_ERROR});
    }
  };
};
