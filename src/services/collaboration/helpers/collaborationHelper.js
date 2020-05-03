import {FirebaseCollaboration} from '../firabase/FirebaseCollaboration';

export const addSharedListCollaboratorPended = async ({
  shoppingList,
  collaborator,
  collaborationService,
}) => {
  increasePendedActionsCounter(collaborationService, shoppingList.id);

  const pendedFunc = async sharedListData => {
    let result = false;
    const {status, sharedListKey} = sharedListData;
    if (status === FirebaseCollaboration.status.SUCCESS) {
      result = await collaborationService.addSharedListCollaborator({
        shoppingListId: sharedListKey,
        collaborator,
      });
    }

    decreaseAndCleanPendedInfo(collaborationService, shoppingList.id);

    return {
      success: result,
      action: collaborationService.actions.ADD_SHARED_LIST_COLLABORATOR,
    };
  };

  let sharedListData = collaborationService.pendingIdsMap.get(shoppingList.id);
  if (sharedListData) {
    return await pendedFunc(sharedListData);
  }

  let counter = 1000;
  while (counter > 0) {
    await wait(20);

    sharedListData = collaborationService.pendingIdsMap.get(shoppingList.id);
    if (sharedListData) {
      return await pendedFunc(sharedListData);
    }

    --counter;
  }

  decreaseAndCleanPendedInfo(collaborationService, shoppingList.id);

  return {
    success: false,
    action: collaborationService.actions.ADD_SHARED_LIST_COLLABORATOR,
  };
};

const increasePendedActionsCounter = (collaborationService, shoppingListId) => {
  let pendedActionsCounter = collaborationService.pendedActionsCounter.get(
    shoppingListId,
  );
  if (!pendedActionsCounter) {
    pendedActionsCounter = 0;
  }
  collaborationService.pendedActionsCounter.set(
    shoppingListId,
    ++pendedActionsCounter,
  );

  return pendedActionsCounter;
};

const decreasePendedActionsCounter = (collaborationService, shoppingListId) => {
  let pendedActionsCounter = collaborationService.pendedActionsCounter.get(
    shoppingListId,
  );
  if (!pendedActionsCounter) {
    return 0;
  }
  collaborationService.pendedActionsCounter.set(
    shoppingListId,
    --pendedActionsCounter,
  );

  return pendedActionsCounter;
};

const wait = async milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const decreaseAndCleanPendedInfo = (collaborationService, shoppingListId) => {
  const pendedActions = decreasePendedActionsCounter(
    collaborationService,
    shoppingListId,
  );

  if (pendedActions <= 0) {
    collaborationService.pendingIdsMap.delete(shoppingListId);
    collaborationService.pendedActionsCounter.delete(shoppingListId);
  }
};
