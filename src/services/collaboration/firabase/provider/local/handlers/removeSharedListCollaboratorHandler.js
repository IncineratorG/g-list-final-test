import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';

export const removeSharedListCollaboratorHandler = async ({
  shoppingListId,
  collaborator,
}) => {
  if (!shoppingListId || !collaborator) {
    return {status: FirebaseResponse.type.ERROR};
  }

  // Путь до создателя списка.
  const listSenderPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST_SENDER,
    shoppingListId,
  });
  // Путь до получателей списка.
  const listReceiversPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST_RECEIVERS,
    shoppingListId,
  });

  // Получаем данные создателя списка.
  const senderData = await database()
    .ref(listSenderPath)
    .once('value');
  // Получаем данные получателей списка.
  const receiversData = await database()
    .ref(listReceiversPath)
    .once('value');

  // Получаем ID создателя и получателей списка.
  const senderId = IdManager.getId(senderData.val());
  const receiversIds = [];
  let removedCollaboratorListKey = '';
  receiversData.forEach(child => {
    if (child.val() !== collaborator) {
      receiversIds.push(IdManager.getId(child.val()));
    } else {
      removedCollaboratorListKey = child.key;
    }
  });
  const removedCollaboratorId = IdManager.getId(collaborator);

  if (removedCollaboratorListKey.length <= 0) {
    return {status: FirebaseResponse.type.ERROR};
  }

  const updateTimestamp = Date.now();

  let updates = {};

  // Обновляем данные создателя спискаю
  const senderPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER_SEND_DELIM,
    userId: senderId,
  });
  updates[
    senderPath +
      shoppingListId +
      FirebasePaths.d +
      FirebasePaths.folderNames.UPDATE_TIMESTAMP
  ] = updateTimestamp;

  // Обновляем данные не удалённых получателей списка.
  receiversIds.forEach(id => {
    const receiverPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
      userId: id,
    });
    updates[
      receiverPath +
        shoppingListId +
        FirebasePaths.d +
        FirebasePaths.folderNames.UPDATE_TIMESTAMP
    ] = updateTimestamp;
  });

  // Обновляем список покупок.
  const shoppingListPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST_DELIM,
    shoppingListId,
  });
  updates[
    shoppingListPath +
      FirebasePaths.d +
      FirebasePaths.folderNames.UPDATE_TIMESTAMP
  ] = updateTimestamp;

  // Обновляем карточку списка покупок.
  const shoppingListCardPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST_CARD_DELIM,
    shoppingListId,
  });
  updates[
    shoppingListCardPath +
      FirebasePaths.d +
      FirebasePaths.folderNames.UPDATE_TIMESTAMP
  ] = updateTimestamp;

  // Удаляем получателя списка.
  updates[
    listReceiversPath + FirebasePaths.d + removedCollaboratorListKey
  ] = null;

  // Удаляем список у соответствующего пользователя.
  const removedReceiverPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
    userId: removedCollaboratorId,
  });
  updates[removedReceiverPath + shoppingListId] = null;

  // Применяем обновление.
  await database()
    .ref()
    .update(updates);

  return {
    status: FirebaseResponse.type.SUCCESS,
    remainingReceiversCount: receiversIds.length,
  };
};
