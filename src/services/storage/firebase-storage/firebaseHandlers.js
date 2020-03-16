import database from '@react-native-firebase/database';
import {FirebasePaths} from './FirebasePaths';
import {SHARED_SHOPPING_LIST} from './firebasePathTypes';
import {FirebaseConverter} from './list-converter/FirebaseConverter';
import {FirebaseStorage} from './FirebaseStorage';

export const sendPathHandler = async snapshot => {
  await processSharedPathSnapshot({
    snapshot,
    localSharedListMap: FirebaseStorage.sendSharedShoppingLists,
    localSharedListIdsSet: FirebaseStorage.sendSharedShoppingListsIds,
    changeEvent: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
  });
};

export const receivedPathHandler = async snapshot => {
  await processSharedPathSnapshot({
    snapshot,
    localSharedListMap: FirebaseStorage.receivedSharedShoppingLists,
    localSharedListIdsSet: FirebaseStorage.receivedSharedShoppingListsIds,
    changeEvent: FirebaseStorage.events.SHARED_RECEIVED_LISTS_CHANGED,
  });
};

export const sharedListChangedHandler = () => {
  console.log('SHARED_LIST_CHANGED_HANDLER');
};

const processSharedPathSnapshot = async ({
  snapshot,
  localSharedListMap,
  localSharedListIdsSet,
  changeEvent,
}) => {
  if (snapshot.val() === null) {
    // Удаляем с клиента соответсвующие списки покупок.
    localSharedListMap.clear();
    localSharedListIdsSet.clear();

    FirebaseStorage.notifier.notify({
      event: changeEvent,
    });

    return;
  }

  // Список ID не имеющихся на клиенте списков.
  const newSharedListsIdsArr = [];

  localSharedListIdsSet.clear();
  snapshot.forEach(child => {
    localSharedListIdsSet.add(child.key);
    if (!localSharedListMap.has(child.key)) {
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
  localSharedListMap.forEach((list, id) => {
    if (!localSharedListIdsSet.has(id)) {
      localSharedListsToRemoveIds.push(id);
    }
  });

  // Удаляем необходимые спсики с клиента.
  localSharedListsToRemoveIds.forEach(id => {
    localSharedListMap.delete(id);
  });

  // Добавляем новые совместные списки клиенту.
  newSharedListsData.forEach(sharedListData => {
    const {shoppingList, units, classes} = sharedListData;
    localSharedListMap.set(shoppingList.id, {
      shoppingList,
      units,
      classes,
    });
  });

  FirebaseStorage.notifier.notify({
    event: changeEvent,
  });
};
