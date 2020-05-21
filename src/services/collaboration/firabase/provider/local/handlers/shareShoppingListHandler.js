import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';
import {RemoteNotifier} from '../helpers/RemoteNotifier';
import {RemoteMessage} from '../helpers/RemoteMessage';

export const shareShoppingListHandler = async ({
  receivers,
  sender,
  shoppingList,
  shoppingListCard,
  units,
  classes,
}) => {
  const senderEmail = sender;
  const receiversEmails = receivers;

  if (
    !receiversEmails ||
    receiversEmails.length <= 0 ||
    !senderEmail ||
    senderEmail.length <= 0 ||
    !shoppingListCard ||
    !shoppingList ||
    !units ||
    !classes
  ) {
    return {status: FirebaseResponse.type.ERROR};
  }

  const senderId = IdManager.getId(senderEmail);
  const receiversIds = receiversEmails.map(email => IdManager.getId(email));

  const senderPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER,
    userId: senderId,
  });
  const senderDbData = await database()
    .ref(senderPath)
    .once('value');
  if (!senderDbData.exists()) {
    return {status: FirebaseResponse.type.NOT_EXIST};
  }

  let receiversDbData = await Promise.all(
    receiversIds.map(async id => {
      const receiverPath = FirebasePaths.getPath({
        pathType: FirebasePaths.paths.USER,
        userId: id,
      });
      const receiverDbData = await database()
        .ref(receiverPath)
        .once('value');
      if (receiverDbData.exists()) {
        return {id: id, token: receiverDbData.val().token};
      } else {
        return {id: undefined, token: undefined};
      }
    }),
  );

  receiversDbData = receiversDbData.filter(data => data.id && data.token);
  if (!receiversDbData.length) {
    return {status: FirebaseResponse.type.NOT_EXIST};
  }

  const shoppingListRootPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LISTS_DATA_ROOT,
  });
  const sharedListRef = database()
    .ref(shoppingListRootPath)
    .push();

  const shoppingListDescription = Object.assign({}, shoppingList);
  shoppingListDescription.id = sharedListRef.key;
  delete shoppingListDescription.productsList;

  const firstUpdates = {};
  const shoppingListPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST_DATA,
    shoppingListId: sharedListRef.key,
  });
  firstUpdates[shoppingListPath] = {
    sender: senderEmail,
    shoppingListCard,
    shoppingList: shoppingListDescription,
  };
  await database()
    .ref()
    .update(firstUpdates);

  const secondUpdates = {};
  classes.forEach(cls => {
    const clsKey = database()
      .ref(
        shoppingListPath + FirebasePaths.d + FirebasePaths.folderNames.CLASSES,
      )
      .push().key;
    secondUpdates[
      shoppingListPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.CLASSES +
        FirebasePaths.d +
        clsKey
    ] = cls;
  });
  units.forEach(unit => {
    const unitKey = database()
      .ref(shoppingListPath + FirebasePaths.d + FirebasePaths.folderNames.UNITS)
      .push().key;
    secondUpdates[
      shoppingListPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.UNITS +
        FirebasePaths.d +
        unitKey
    ] = unit;
  });
  receiversEmails.forEach(receiverEmail => {
    const listReceiversPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_RECEIVERS,
      shoppingListId: sharedListRef.key,
    });
    const receiverKey = database()
      .ref(listReceiversPath)
      .push().key;
    secondUpdates[
      listReceiversPath + FirebasePaths.d + receiverKey
    ] = receiverEmail;
  });
  shoppingList.productsList.forEach(product => {
    const productsListPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.PRODUCTS_LIST,
      shoppingListId: sharedListRef.key,
    });
    const productKey = database()
      .ref(productsListPath)
      .push().key;

    product.id = productKey;
    product.parentId = sharedListRef.key;

    secondUpdates[productsListPath + FirebasePaths.d + productKey] = product;
  });

  const currentDate = Date.now();

  const userSendPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER_SEND_DELIM,
    userId: senderId,
  });
  secondUpdates[userSendPath + sharedListRef.key] = {
    id: sharedListRef.key,
    updateTimestamp: currentDate,
  };
  receiversDbData.forEach(data => {
    const userReceivedPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
      userId: data.id,
    });
    secondUpdates[userReceivedPath + sharedListRef.key] = {
      id: sharedListRef.key,
      updateTimestamp: currentDate,
      touched: false,
    };
  });
  await database()
    .ref()
    .update(secondUpdates);

  // Составляем сообщение получателю.
  const message = RemoteMessage.create({
    senderEmail,
    shoppingListName: shoppingList.name,
  });

  // Уведомляем получателя.
  try {
    await RemoteNotifier.notify({receivers, message});
  } catch (e) {
    console.log(
      'shareShoppingListHandler()->NOTIFY_USERS_ERROR: ' + JSON.stringify(e),
    );
  }

  return {
    status: FirebaseResponse.type.SUCCESS,
    sharedListKey: sharedListRef.key,
  };
};
