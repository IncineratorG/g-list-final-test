import database from '@react-native-firebase/database';
import {FirebasePaths} from './FirebasePaths';
import {SHARED_SHOPPING_LIST} from './firebasePathTypes';
import {FirebaseConverter} from './list-converter/FirebaseConverter';
import {FirebaseStorage} from './FirebaseStorage';

export const sendPathHandler = async snapshot => {
  if (snapshot.val() === null) {
    // Удаляем с клиента все отправленные списки покупок.
    FirebaseStorage.sendSharedShoppingListsIds.forEach(id => {
      FirebaseStorage.sendSharedShoppingListsIds.delete(id);
    });

    FirebaseStorage.sendSharedShoppingListsIds.clear();

    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
    });

    return;
  }

  const {
    sharedShoppingLists,
    remoteSharedListsIdsSet,
  } = await processSharedPathSnapshot(snapshot);

  FirebaseStorage.sendSharedShoppingListsIds = new Set(remoteSharedListsIdsSet);

  FirebaseStorage.sharedShoppingLists = new Map(sharedShoppingLists);
  FirebaseStorage.notifier.notify({
    event: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
  });
};

export const receivedPathHandler = async snapshot => {
  if (snapshot.val() === null) {
    // Удаляем с клиента все полученные списки покупок.
    FirebaseStorage.sendSharedShoppingListsIds.forEach(id => {
      FirebaseStorage.receivedSharedShoppingListsIds.delete(id);
    });

    FirebaseStorage.receivedSharedShoppingListsIds.clear();

    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_CHANGED,
    });

    return;
  }

  const {
    sharedShoppingLists,
    remoteSharedListsIdsSet,
  } = await processSharedPathSnapshot(snapshot);

  FirebaseStorage.receivedSharedShoppingListsIds = new Set(
    remoteSharedListsIdsSet,
  );

  FirebaseStorage.sharedShoppingLists = new Map(sharedShoppingLists);
  FirebaseStorage.notifier.notify({
    event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_CHANGED,
  });
};

export const sharedListChangedHandler = () => {
  console.log('SHARED_LIST_CHANGED_HANDLER');
};

const processSharedPathSnapshot = async snapshot => {
  // Копия совместных спискв, имеющихся на клиенте.
  const localSharedShoppingLists = new Map(FirebaseStorage.sharedShoppingLists);

  // Список ID не имеющихся на клиенте совместных списков.
  const newSharedListsIdsArr = [];
  // Множество ID совместных списков, имеющихся на сервере.
  const remoteSharedListsIdsSet = new Set();

  snapshot.forEach(child => {
    remoteSharedListsIdsSet.add(child.key);
    if (!localSharedShoppingLists.has(child.key)) {
      newSharedListsIdsArr.push(child.key);
    }
  });

  // Составляем список новых совместных списков.
  const newSharedListsData = await Promise.all(
    newSharedListsIdsArr.map(async id => {
      const sharedShoppingListPath = database().ref(
        FirebasePaths.getPath({
          pathType: SHARED_SHOPPING_LIST,
          pathId: id,
        }),
      );

      const sharedShoppingListSnapshot = await sharedShoppingListPath.once(
        'value',
      );
      return FirebaseConverter.listFromFirebase(sharedShoppingListSnapshot);
    }),
  );

  // Ищем ID списков, которые были удалены с серверов, но находятся на клиенте.
  const localSharedListsToRemoveIds = [];
  localSharedShoppingLists.forEach((list, id) => {
    if (!remoteSharedListsIdsSet.has(id)) {
      localSharedListsToRemoveIds.push(id);
    }
  });

  // Удаляем необходимые спсики с клиента.
  localSharedListsToRemoveIds.forEach(id => {
    localSharedShoppingLists.delete(id);
  });

  // Добавляем новые совместные списки клиенту.
  newSharedListsData.forEach(sharedListData => {
    const {shoppingList, units, classes} = sharedListData;
    localSharedShoppingLists.set(shoppingList.id, {
      shoppingList,
      units,
      classes,
    });
  });

  return {
    sharedShoppingLists: localSharedShoppingLists,
    remoteSharedListsIdsSet,
  };
};
