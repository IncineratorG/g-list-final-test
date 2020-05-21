import {FirebasePaths} from '../firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../firebase-storage/id-manager/IdManager';
import {FirebaseConverter} from '../firebase-storage/list-converter/FirebaseConverter';

export const wait = async milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const getShoppingListPended = async (
  shoppingListId,
  firebaseStorage,
) => {
  const pendedFunc = async listData => {
    // Уведомляем списком покупок из запрошенных данных всех слушателей текущего списка.
    firebaseStorage.notifier.notify({
      event: firebaseStorage.events.SHARED_PRODUCTS_UPDATED,
      data: {shoppingListId, products: listData.shoppingList.productsList},
    });

    // Если на кокой-либо список покупок в firebase установлен слушатель - снимаем его.
    if (firebaseStorage.shoppingListPathHandler.path) {
      firebaseStorage.shoppingListPathHandler.path.off(
        'value',
        firebaseStorage.shoppingListPathHandler.handler,
      );
    }

    // Получаем путь до соответвующего списка покупок.
    const shoppingListPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST,
      shoppingListId,
    });

    // Устанавливаем слушатель на соответсвующий список покупок в firebase.
    const shoppingListPathRef = database().ref(shoppingListPath);
    shoppingListPathRef.on(
      'value',
      firebaseStorage.handlers.get('sharedListChanged'),
    );

    firebaseStorage.shoppingListPathHandler.path = shoppingListPathRef;
    firebaseStorage.shoppingListPathHandler.handler = firebaseStorage.handlers.get(
      'sharedListChanged',
    );

    // Помечаем список покупок как прочитанный.
    if (
      firebaseStorage.receivedSharedShoppingLists.has(shoppingListId) &&
      !listData.touched
    ) {
      listData.touched = true;
      firebaseStorage.receivedSharedShoppingLists.set(shoppingListId, listData);

      const receivedPath = FirebasePaths.getPath({
        pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
        userId: IdManager.getFirebaseId(firebaseStorage.localSignInInfo),
      });

      database()
        .ref(receivedPath)
        .child(shoppingListId)
        .update({touched: true});
    }

    return listData.shoppingList;
  };

  let counter = 1000;
  while (counter > 0) {
    // Получаем данные соответсвующего списка покупок.
    const listData = firebaseStorage.sendSharedShoppingLists.has(shoppingListId)
      ? firebaseStorage.sendSharedShoppingLists.get(shoppingListId)
      : firebaseStorage.receivedSharedShoppingLists.get(shoppingListId);

    if (listData) {
      return await pendedFunc(listData);
    }

    await wait(20);

    --counter;
  }

  return undefined;
};

export const getShoppingListOnce = async (shoppingListId, firebaseStorage) => {
  const shoppingListPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.SHOPPING_LIST,
    shoppingListId,
  });

  const shoppingListPathRef = database().ref(shoppingListPath);
  if (
    firebaseStorage.shoppingListPathHandler.path &&
    firebaseStorage.shoppingListPathHandler.path.toString() ===
      shoppingListPathRef.toString()
  ) {
    // Получаем данные соответсвующего списка покупок.
    const listData = firebaseStorage.sendSharedShoppingLists.has(shoppingListId)
      ? firebaseStorage.sendSharedShoppingLists.get(shoppingListId)
      : firebaseStorage.receivedSharedShoppingLists.get(shoppingListId);

    if (listData) {
      return listData.shoppingList;
    } else {
      return undefined;
    }
  }

  const shoppingListSnapshot = await database()
    .ref(shoppingListPath)
    .once('value');

  return FirebaseConverter.listFromFirebase({
    shoppingListId,
    receiversSnapshot: undefined,
    shoppingListCardSnapshot: shoppingListSnapshot,
    productsSnapshot: shoppingListSnapshot.child('productsList'),
  });
};

// export const getShoppingListOnce = async (shoppingListId, firebaseStorage) => {
//   const shoppingListPath = FirebasePaths.getPath({
//     pathType: FirebasePaths.paths.SHOPPING_LIST,
//     shoppingListId,
//   });
//
//   const shoppingListSnapshot = await database()
//     .ref(shoppingListPath)
//     .once('value');
//
//   const shoppingList = FirebaseConverter.listFromFirebase({
//     shoppingListId,
//     receiversSnapshot: undefined,
//     shoppingListCardSnapshot: shoppingListSnapshot,
//     productsSnapshot: shoppingListSnapshot.child('productsList'),
//   });
//
//   return shoppingList;
// };
