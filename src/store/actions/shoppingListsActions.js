import {Storage} from '../../services/storage/Storage';
import {
  SL_REMOVE_SHOPPING_LIST_BEGIN,
  SL_REMOVE_SHOPPING_LIST_ERROR,
  SL_REMOVE_SHOPPING_LIST_FINISHED,
  SL_SET_RECEIVED_LISTS_LOADING,
  SL_SET_SEND_LISTS_LOADING,
  SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN,
  SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR,
  SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
  SL_SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
  SL_UNSUBSCRIBE_FROM_LIST_OF_SHOPPING_LISTS,
  SL_UNSUBSCRIBE_FROM_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
  SL_UPDATE_LIST_OF_SHOPPING_LISTS,
} from '../types/shoppingListsTypes';
import {StorageIdResolver} from '../../services/storage/StorageIdResolver';
import {Collaboration} from '../../services/collaboration/Collaboration';

export const sl_subscribeToListOfShoppingLists = () => {
  return async dispatch => {
    dispatch(sl_subscribeToSharedListOfShoppingListsLoadingStatus());

    dispatch({type: SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN});

    try {
      const listOfShoppingListsChangedHandler = listOfShoppingLists => {
        dispatch({
          type: SL_UPDATE_LIST_OF_SHOPPING_LISTS,
          payload: listOfShoppingLists,
        });
      };

      const subscription = await Storage.subscribe({
        event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
        handler: listOfShoppingListsChangedHandler,
      });

      dispatch({
        type: SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
        payload: {
          unsubscribe: subscription.unsubscribe,
          listOfShoppingLists: subscription.data,
        },
      });
    } catch (e) {
      dispatch({
        type: SL_SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR,
        payload: e,
      });
    }
  };
};

export const sl_unsubscribeFromListOfShoppingLists = () => {
  return async dispatch => {
    dispatch(sl_unsubscribeFromSharedListOfShoppingListsLoadingStatus());
    dispatch({type: SL_UNSUBSCRIBE_FROM_LIST_OF_SHOPPING_LISTS});
  };
};

export const sl_subscribeToSharedListOfShoppingListsLoadingStatus = () => {
  return async dispatch => {
    const sendListsLoadingHandler = () => {
      dispatch({type: SL_SET_SEND_LISTS_LOADING, payload: true});
    };
    const sendListsLoadedHandler = () => {
      dispatch({type: SL_SET_SEND_LISTS_LOADING, payload: false});
    };
    const receivedListsLoadingHandler = () => {
      dispatch({type: SL_SET_RECEIVED_LISTS_LOADING, payload: true});
    };
    const receivedListsLoadedHandler = () => {
      dispatch({type: SL_SET_RECEIVED_LISTS_LOADING, payload: false});
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
      type: SL_SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
      payload: {unsubscribeHandlers},
    });
  };
};

export const sl_unsubscribeFromSharedListOfShoppingListsLoadingStatus = () => {
  return async dispatch => {
    dispatch({
      type: SL_UNSUBSCRIBE_FROM_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
    });
  };
};

export const sl_removeShoppingList = id => {
  return async (dispatch, getState) => {
    const currentUserEmail = getState().authentication.currentUser.email;

    dispatch({type: SL_REMOVE_SHOPPING_LIST_BEGIN});

    try {
      const {listType, currentUserIsOwner} = await Storage.removeShoppingList({
        shoppingListId: id,
      });

      if (listType === StorageIdResolver.listTypes.FIREBASE) {
        if (currentUserIsOwner) {
          await Collaboration.removeSharedShoppingList({shoppingListId: id});
        } else {
          await Collaboration.removeSharedListCollaborator({
            shoppingListId: id,
            collaborator: currentUserEmail,
          });
        }
      }

      dispatch({type: SL_REMOVE_SHOPPING_LIST_FINISHED, payload: id});
    } catch (e) {
      console.log('shoppingListsActions->removeShoppingList() ERROR: ' + e);
      dispatch({type: SL_REMOVE_SHOPPING_LIST_ERROR});
    }
  };
};
