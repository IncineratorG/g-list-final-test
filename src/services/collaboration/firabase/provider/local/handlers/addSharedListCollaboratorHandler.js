import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';
import {RemoteNotifier} from '../helpers/RemoteNotifier';
import {Storage} from '../../../../../storage/Storage';
import {RemoteMessage} from '../helpers/RemoteMessage';

export const addSharedListCollaboratorHandler = async ({
  shoppingListId,
  collaborator,
}) => {
  if (!shoppingListId || !collaborator) {
    return FirebaseResponse.type.ERROR;
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
  const senderEmail = senderData.val();
  const senderId = IdManager.getId(senderEmail);
  const receiversIds = [];
  receiversData.forEach(child => {
    receiversIds.push(IdManager.getId(child.val()));
  });
  const newCollaboratorId = IdManager.getId(collaborator);

  const updateTimestamp = Date.now();

  // Получаем ID нового получаетеля списка.
  const collaboratorKeyRef = database()
    .ref(listReceiversPath)
    .push();

  let updates = {};

  // Обновляем данные создателя списка.
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

  // Обновляем данные существующих получателей списка.
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

  // Добавляем получателя.
  updates[
    listReceiversPath + FirebasePaths.d + collaboratorKeyRef.key
  ] = collaborator;

  // Добавляем список новому пользователю.
  const newReceiverPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
    userId: newCollaboratorId,
  });
  updates[newReceiverPath + shoppingListId] = {
    id: shoppingListId,
    updateTimestamp,
    touched: false,
  };

  // Применяем обновление.
  await database()
    .ref()
    .update(updates);

  // Составляем сообщение получателю.
  const {data} = await Storage.subscribe({
    shoppingListId,
    event: Storage.events.SHOPPING_LIST_CHANGED,
    once: true,
  });
  const shoppingListName = data ? data.name : undefined;
  const message = RemoteMessage.create({senderEmail, shoppingListName})

  // Уведомляем получателя.
  try {
    await RemoteNotifier.notify({receivers: [collaborator], message});
  } catch (e) {
    console.log(
      'addSharedListCollaboratorHandler()->NOTIFY_USERS_ERROR: ' +
        JSON.stringify(e),
    );
  }

  return FirebaseResponse.type.SUCCESS;
};
