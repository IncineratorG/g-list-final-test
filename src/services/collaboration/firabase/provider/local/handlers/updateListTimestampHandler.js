import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';

export const updateListTimestampHandler = async ({editor, shoppingListId}) => {
  const editorPhone = editor;

  if (
    !shoppingListId ||
    shoppingListId.toString().length <= 0 ||
    !editorPhone ||
    editorPhone.toString().length <= 0
  ) {
    return {status: FirebaseResponse.type.ERROR};
  }

  const listSenderData = await database()
    .ref('/shared/shoppingLists/' + shoppingListId + '/sender')
    .once('value');
  const listReceiversData = await database()
    .ref('/shared/shoppingLists/' + shoppingListId + '/receivers')
    .once('value');

  const listSenders = [];
  const listReceivers = [];

  if (listSenderData.val() !== editorPhone) {
    listSenders.push(listSenderData.val());
  }
  listReceiversData.forEach(child => {
    if (child.val() !== editorPhone) {
      listReceivers.push(child.val());
    }
  });

  const currentDate = Date.now();
  const updates = {};
  listSenders.forEach(senderPhone => {
    updates[
      '/users/' + senderPhone + '/send/' + shoppingListId + '/updateTimestamp'
    ] = currentDate;
  });
  listReceivers.forEach(receiverPhone => {
    updates[
      '/users/' +
        receiverPhone +
        '/received/' +
        shoppingListId +
        '/updateTimestamp'
    ] = currentDate;
  });

  await database()
    .ref()
    .update(updates);

  return {status: FirebaseResponse.type.SUCCESS};
};
