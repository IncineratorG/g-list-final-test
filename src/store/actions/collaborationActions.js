import {Collaboration} from '../../services/collaboration/Collaboration';
import {
  ADD_COLLABORATOR,
  LOAD_COLLABORATORS,
  SET_COLLABORATOR_ERROR,
  SET_COLLABORATOR_EXIST_STATUS,
  SET_COLLABORATOR_PENDING,
  SET_COLLABORATOR_SELECTED,
  SET_COLLABORATOR_UNSELECTED,
} from '../types/collaborationTypes';
import {Storage} from '../../services/storage/Storage';
import {subscribeToShoppingList} from './shoppingListActions';
import {StorageIdResolver} from '../../services/storage/StorageIdResolver';

export const loadCollaborators = () => {
  return async dispatch => {
    const collaborators = await Collaboration.getCollaborators();

    dispatch({type: LOAD_COLLABORATORS, payload: collaborators});
  };
};

export const addCollaborator = ({email}) => {
  return async dispatch => {
    const newCollaborator = await Collaboration.addCollaborator({
      email,
      status: Collaboration.collaboratorStatus.UNKNOWN,
    });
    if (!newCollaborator) {
      return;
    }

    dispatch({type: ADD_COLLABORATOR, payload: newCollaborator});

    const userExist = await Collaboration.userExist({email});
    if (userExist) {
      await Collaboration.setCollaboratorStatus({
        id: newCollaborator.id,
        status: Collaboration.collaboratorStatus.EXIST,
      });
      dispatch({
        type: SET_COLLABORATOR_EXIST_STATUS,
        payload: {
          id: newCollaborator.id,
          status: Collaboration.collaboratorStatus.EXIST,
        },
      });
    } else {
      await Collaboration.removeCollaborator({id: newCollaborator.id});
      dispatch({
        type: SET_COLLABORATOR_EXIST_STATUS,
        payload: {
          id: newCollaborator.id,
          status: Collaboration.collaboratorStatus.NOT_EXIST,
        },
      });
    }
  };
};

export const removeCollaborator = ({id}) => {
  return async dispatch => {
    await Collaboration.removeCollaborator({id});
    dispatch(loadCollaborators());
  };
};

export const shareShoppingListWithUser = ({
  sender,
  collaborator,
  shoppingListId,
}) => {
  return async (dispatch, getState) => {
    console.log('shareShoppingListWithUser(): ');

    dispatch({type: SET_COLLABORATOR_PENDING, payload: collaborator.id});

    const listType = StorageIdResolver.resolve(shoppingListId);

    const {receivers} = getState().shoppingList.currentShoppingList;

    const listShared =
      listType === StorageIdResolver.listTypes.FIREBASE || receivers.length > 0;
    if (listShared) {
      await addSharedListCollaborator({
        collaborator,
        shoppingListId,
        dispatch,
      });
    } else {
      await shareShoppingList({collaborator, sender, shoppingListId, dispatch});
    }
  };
};

export const cancelShareShoppingListWithUser = ({
  sender,
  collaborator,
  shoppingListId,
}) => {
  return async (dispatch, getState) => {
    dispatch({type: SET_COLLABORATOR_PENDING, payload: collaborator.id});

    const {receivers} = getState().shoppingList.currentShoppingList;

    const result = await Collaboration.removeSharedListCollaborator({
      shoppingListId,
      collaborator: collaborator.email,
    });

    if (result) {
      // ===
      receivers.pop();
      if (receivers.length <= 0) {
        const copiedShoppingListId = await Storage.makeShoppingListLocalCopy({
          shoppingListId,
        });
        console.log('COPIED_ID: ' + copiedShoppingListId);
      }
      // ===

      dispatch({type: SET_COLLABORATOR_UNSELECTED, payload: collaborator.id});
    } else {
      dispatch({type: SET_COLLABORATOR_ERROR, payload: collaborator.id});
    }
  };
};

const shareShoppingList = async ({
  collaborator,
  sender,
  shoppingListId,
  dispatch,
}) => {
  const shoppingListData = await Storage.subscribe({
    shoppingListId,
    event: Storage.events.SHOPPING_LIST_CHANGED,
    once: true,
  });

  const currentTimestamp = Date.now();

  const shoppingList = shoppingListData.data;
  shoppingList.creator = sender;
  shoppingList.createTimestamp = currentTimestamp;
  shoppingList.updateTimestamp = currentTimestamp;

  const units = await Storage.getUnits({shoppingListId});
  const classes = await Storage.getClasses({shoppingListId});

  const receivers = [];
  receivers.push(collaborator.email);

  const shoppingListCard = {
    name: shoppingList.name,
    totalItemsCount: shoppingList.totalItemsCount,
    completedItemsCount: shoppingList.completedItemsCount,
    createTimestamp: shoppingList.createTimestamp,
    updateTimestamp: shoppingList.updateTimestamp,
    creator: sender,
  };

  const result = await Collaboration.shareShoppingList({
    receivers: receivers,
    sender: sender,
    shoppingList,
    shoppingListCard,
    units,
    classes,
  });

  if (result.action === Collaboration.actions.SHARE_SHOPPING_LIST) {
    const sharedListId = result.sharedListId;
    console.log('ACTION_WAS: SHARE_SHOPPING_LIST: ' + sharedListId);

    if (result.success) {
      await dispatch(subscribeToShoppingList(sharedListId));
      // dispatch(removeShoppingList(shoppingListId));
      dispatch({type: SET_COLLABORATOR_SELECTED, payload: collaborator.id});
    } else {
      dispatch({type: SET_COLLABORATOR_ERROR, payload: collaborator.id});
    }
  } else if (
    result.action === Collaboration.actions.ADD_SHARED_LIST_COLLABORATOR
  ) {
    console.log('ACTION_WAS: ADD_SHARED_LIST_COLLABORATOR');

    if (result.success) {
      dispatch({type: SET_COLLABORATOR_SELECTED, payload: collaborator.id});
    } else {
      dispatch({type: SET_COLLABORATOR_ERROR, payload: collaborator.id});
    }
  }
};

const addSharedListCollaborator = async ({
  collaborator,
  shoppingListId,
  dispatch,
}) => {
  console.log('addSharedListCollaborator_ACTION');

  let result = {};
  result.success = await Collaboration.addSharedListCollaborator({
    shoppingListId,
    collaborator: collaborator.email,
  });

  if (result.success) {
    dispatch({type: SET_COLLABORATOR_SELECTED, payload: collaborator.id});
  } else {
    dispatch({type: SET_COLLABORATOR_ERROR, payload: collaborator.id});
  }
};

// export const shareShoppingList = ({receiver, sender, shoppingListId}) => {
//   return async dispatch => {
//     // ===
//     console.log(
//       'shareShoppingList(): ' +
//         receiver +
//         ' - ' +
//         sender +
//         ' - ' +
//         shoppingListId,
//     );
//     // ===
//
//     // const shoppingListData = await Storage.subscribe({
//     //   shoppingListId,
//     //   event: Storage.events.SHOPPING_LIST_CHANGED,
//     //   once: true,
//     // });
//     //
//     // const shoppingList = shoppingListData.data;
//     // shoppingList.creator = sender;
//     // const units = await Storage.getUnits({shoppingListId});
//     // const classes = await Storage.getClasses({shoppingListId});
//     //
//     // const receivers = [];
//     // receivers.push(receiver);
//     //
//     // const shoppingListCard = {
//     //   name: shoppingList.name,
//     //   totalItemsCount: shoppingList.totalItemsCount,
//     //   completedItemsCount: shoppingList.completedItemsCount,
//     //   createTimestamp: shoppingList.createTimestamp,
//     //   updateTimestamp: shoppingList.updateTimestamp,
//     //   creator: sender,
//     // };
//     //
//     // await Collaboration.shareShoppingList({
//     //   receivers: receivers,
//     //   sender: sender,
//     //   shoppingList,
//     //   shoppingListCard,
//     //   units,
//     //   classes,
//     // });
//   };
// };

// export const shareShoppingList = ({receiver, sender, shoppingListId}) => {
//   return async dispatch => {
//     const shoppingListData = await Storage.subscribe({
//       shoppingListId,
//       event: Storage.events.SHOPPING_LIST_CHANGED,
//       once: true,
//     });
//
//     const shoppingList = shoppingListData.data;
//     shoppingList.creator = sender;
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const receivers = [];
//     receivers.push(receiver);
//
//     const shoppingListCard = {
//       name: shoppingList.name,
//       totalItemsCount: shoppingList.totalItemsCount,
//       completedItemsCount: shoppingList.completedItemsCount,
//       createTimestamp: shoppingList.createTimestamp,
//       updateTimestamp: shoppingList.updateTimestamp,
//       creator: sender,
//     };
//
//     await Collaboration.shareShoppingList({
//       receivers: receivers,
//       sender: sender,
//       shoppingList,
//       shoppingListCard,
//       units,
//       classes,
//     });
//   };
// };

// =========
// ================
// export const clearPotentialCollaboratorData = () => {
//   return async dispatch => {
//     dispatch({type: CLEAR_POTENTIAL_COLLABORATOR_DATA});
//   };
// };
//
// export const checkUserExistence = ({phone}) => {
//   return async dispatch => {
//     dispatch({type: CHECK_USER_EXISTENCE_BEGIN});
//
//     try {
//       const exist = await Collaboration.userExist({phone});
//       dispatch({type: CHECK_USER_EXISTENCE_FINISH, payload: {phone, exist}});
//     } catch (e) {
//       dispatch({type: CHECK_USER_EXISTENCE_ERROR, payload: {description: e}});
//     }
//   };
// };
//
// export const sendTextMessage = ({receiverPhone, senderPhone, messageText}) => {
//   return async dispatch => {
//     dispatch({type: SEND_TEXT_MESSAGE_BEGIN});
//
//     try {
//       await Collaboration.sendMessage({
//         receiverPhone,
//         senderPhone,
//         messageText,
//       });
//
//       dispatch({type: SEND_TEXT_MESSAGE_FINISH});
//     } catch (e) {
//       dispatch({type: SEND_TEXT_MESSAGE_ERROR});
//     }
//   };
// };
//
// export const shareShoppingList = ({receiver, sender, shoppingListId}) => {
//   return async dispatch => {
//     const shoppingListData = await Storage.subscribe({
//       shoppingListId,
//       event: Storage.events.SHOPPING_LIST_CHANGED,
//       once: true,
//     });
//
//     const shoppingList = shoppingListData.data;
//     shoppingList.creator = sender;
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const receivers = [];
//     receivers.push(receiver);
//
//     const shoppingListCard = {
//       name: shoppingList.name,
//       totalItemsCount: shoppingList.totalItemsCount,
//       completedItemsCount: shoppingList.completedItemsCount,
//       createTimestamp: shoppingList.createTimestamp,
//       updateTimestamp: shoppingList.updateTimestamp,
//       creator: sender,
//     };
//
//     await Collaboration.shareShoppingList({
//       receivers: receivers,
//       sender: sender,
//       shoppingList,
//       shoppingListCard,
//       units,
//       classes,
//     });
//   };
// };
// ================
// =========

// export const shareShoppingList = ({
//   receiverPhone,
//   senderPhone,
//   shoppingListId,
// }) => {
//   return async dispatch => {
//     const shoppingListData = await Storage.subscribe({
//       shoppingListId,
//       event: Storage.events.SHOPPING_LIST_CHANGED,
//       once: true,
//     });
//
//     const shoppingList = shoppingListData.data;
//     shoppingList.creator = senderPhone;
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const receivers = [];
//     receivers.push(receiverPhone);
//
//     const shoppingListCard = {
//       name: shoppingList.name,
//       totalItemsCount: shoppingList.totalItemsCount,
//       completedItemsCount: shoppingList.completedItemsCount,
//       createTimestamp: shoppingList.createTimestamp,
//       updateTimestamp: shoppingList.updateTimestamp,
//       creator: senderPhone,
//     };
//
//     await Collaboration.shareShoppingList({
//       receivers: receivers,
//       sender: senderPhone,
//       shoppingList,
//       shoppingListCard,
//       units,
//       classes,
//     });
//   };
// };

// export const shareShoppingList = ({
//   receiverPhone,
//   senderPhone,
//   shoppingListId,
// }) => {
//   return async dispatch => {
//     console.log('HERE');
//
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const shoppingListName = await Storage.getShoppingListName({
//       shoppingListId,
//     });
//     const products = await Storage.getProductsList({shoppingListId});
//
//     const shoppingList = {
//       id: shoppingListId,
//       name: shoppingListName,
//       products,
//     };
//
//     await Collaboration.shareShoppingList({
//       receiver: receiverPhone,
//       sender: senderPhone,
//       shoppingList,
//       units,
//       classes,
//     });
//
//     // const productsListUnitsIds = [];
//     // const productsListClassesIds = [];
//     // productsList.map(product => {
//     //   if (productsListUnitsIds.indexOf(product.unitId) < 0) {
//     //     productsListUnitsIds.push(product.unitId);
//     //   }
//     //   if (productsListClassesIds.indexOf(product.classId) < 0) {
//     //     productsListClassesIds.push(product.classId);
//     //   }
//     // });
//     //
//     // const productListUnits = units.filter(
//     //   unit => productsListUnitsIds.indexOf(unit.id) >= 0,
//     // );
//     // const productListClasses = classes.filter(
//     //   cl => productsListClassesIds.indexOf(cl.id) >= 0,
//     // );
//     //
//     // productListUnits.forEach(unit => console.log(unit.id + ' - ' + unit.name));
//     // productListClasses.forEach(cl => console.log(cl.id + ' - ' + cl.name));
//     //
//     // const shoppingListShareData = {
//     //   name: shoppingListName,
//     //   products: productsList,
//     //   classes: productListClasses,
//     //   units: productListUnits,
//     // };
//   };
// };
