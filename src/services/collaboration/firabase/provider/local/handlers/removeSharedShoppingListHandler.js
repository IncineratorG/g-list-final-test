import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';

export const removeSharedShoppingListHandler = async ({shoppingListId}) => {
  if (!shoppingListId) {
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
  receiversData.forEach(child => {
    receiversIds.push(IdManager.getId(child.val()));
  });

  let updates = {};

  // Убираем список из папки создателя данного списка.
  const userSendPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER_SEND_DELIM,
    userId: senderId,
  });
  updates[userSendPath + shoppingListId] = null;

  // Убираем список из папок получателей этого списка.
  receiversIds.forEach(receiverId => {
    const userReceivedPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
      userId: receiverId,
    });
    updates[userReceivedPath + shoppingListId] = null;
  });

  // Удаляем сам список покупок.
  const shoppingListPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST_DATA,
    shoppingListId,
  });
  updates[shoppingListPath] = null;

  // Применяем обновление.
  await database()
    .ref()
    .update(updates);

  return {status: FirebaseResponse.type.SUCCESS};
};
