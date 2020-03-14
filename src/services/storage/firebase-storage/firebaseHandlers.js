import database from '@react-native-firebase/database';
import {FirebasePaths} from './FirebasePaths';
import {SHARED_SHOPPING_LIST} from './firebasePathTypes';
import {FirebaseConverter} from './list-converter/FirebaseConverter';
import {FirebaseStorage} from './FirebaseStorage';

export const sendPathHandler = async snapshot => {
  if (snapshot.val() === null) {
    console.log('SEND_PATH_HANDLER: VAL_IS_NULL');
    return;
  }

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

  FirebaseStorage.sharedShoppingLists = new Map(localSharedShoppingLists);
  console.log(
    'SHARED_SHOPPING_LISTS_SIZE: ' + FirebaseStorage.sharedShoppingLists.size,
  );

  // FirebaseStorage.notifier.notify({
  //     event: FirebaseStorage.events.SEND_LISTS_CHANGED,
  //     data:
  // })

  // const sharedListIds = [];
  // snapshot.forEach(child => {
  //   if (!FirebaseStorage.sharedShoppingLists.has(child.key)) {
  //     sharedListIds.push(child.key);
  //   }
  // });
  //
  // const sharedLists = await Promise.all(
  //   sharedListIds.map(async id => {
  //     const sharedShoppingListPath = database().ref(
  //       FirebasePaths.getPath({
  //         pathType: SHARED_SHOPPING_LIST,
  //         pathId: id,
  //       }),
  //     );
  //
  //     const sharedShoppingListSnapshot = await sharedShoppingListPath.once(
  //       'value',
  //     );
  //     return FirebaseConverter.listFromFirebase(sharedShoppingListSnapshot);
  //   }),
  // );
  //
  // FirebaseStorage.notifier.notify({
  //   event: FirebaseStorage.localEvents.SEND_LISTS_SET,
  //   data: sharedLists,
  // });

  // console.log(sharedLists.length);

  // const arr = await Promise.all(
  //   snapshot.map(async (child) => {
  //     // const sharedShoppingListId = child.key;
  //     const sharedShoppingListPath = database().ref(
  //       FirebasePaths.getPath({
  //         pathType: SHARED_SHOPPING_LIST,
  //         pathId: sharedShoppingListId,
  //       }),
  //     );
  //
  //     const sharedShoppingListSnapshot = await sharedShoppingListPath.once(
  //       'value',
  //     );
  //     const sharedShoppingListData = FirebaseConverter.listFromFirebase(
  //       sharedShoppingListSnapshot,
  //     );
  //
  //     return 'sharedShoppingListData';
  //   }),
  // );

  // async function printFiles () {
  //   const files = await getFilePaths();
  //
  //   await Promise.all(files.map(async (file) => {
  //     const contents = await fs.readFile(file, 'utf8')
  //     console.log(contents)
  //   }));
  // }

  // snapshot.forEach(async child => {
  //   const sharedShoppingListId = child.key;
  //   const sharedShoppingListPath = database().ref(
  //     FirebasePaths.getPath({
  //       pathType: SHARED_SHOPPING_LIST,
  //       pathId: sharedShoppingListId,
  //     }),
  //   );
  //
  //   const sharedShoppingListSnapshot = await sharedShoppingListPath.once(
  //     'value',
  //   );
  //   const sharedShoppingListData = FirebaseConverter.listFromFirebase(
  //     sharedShoppingListSnapshot,
  //   );
  //
  //   StorageEvents.fireEvent({
  //     event: SHARED_LIST_ADDED,
  //     data: sharedShoppingListData,
  //   });
  // });
};

export const receivedPathHandler = snapshot => {
  if (snapshot.val() === null) {
    console.log('RECEIVED_PATH_HANDLER: VAL_IS_NULL');
    return;
  }

  console.log('RECEIVED_PATH_HANDLER: ' + JSON.stringify(snapshot.val()));
};

export const sharedListChangedHandler = () => {
  console.log('SHARED_LIST_CHANGED_HANDLER');
};
