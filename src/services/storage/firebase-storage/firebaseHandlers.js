import database from '@react-native-firebase/database';
import {FirebasePaths} from './FirebasePaths';
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

export const sharedListChangedHandler = async snapshot => {
  if (snapshot.val() === null) {
    return;
  }

  const receiversPath = database().ref(
    FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_RECEIVERS,
      shoppingListId: snapshot.val().id,
    }),
  );
  const receiversSnapshot = await receiversPath.once('value');

  const shoppingList = FirebaseConverter.listFromFirebase({
    shoppingListId: snapshot.val().id,
    shoppingListCardSnapshot: snapshot,
    receiversSnapshot,
    productsSnapshot: snapshot.child('productsList'),
  });

  if (FirebaseStorage.sendSharedShoppingLists.has(shoppingList.id)) {
    FirebaseStorage.sendSharedShoppingLists.get(
      shoppingList.id,
    ).shoppingList = shoppingList;
  } else if (FirebaseStorage.receivedSharedShoppingLists.has(shoppingList.id)) {
    FirebaseStorage.receivedSharedShoppingLists.get(
      shoppingList.id,
    ).shoppingList = shoppingList;
  } else {
    console.log('UNKNOWN_ID');
  }

  FirebaseStorage.notifier.notify({
    event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
    data: shoppingList,
  });
};
// export const sharedListChangedHandler = async snapshot => {
//   if (snapshot.val() === null) {
//     return;
//   }
//
//   const receiversPath = database().ref(
//     FirebasePaths.getPath({
//       pathType: FirebasePaths.paths.SHOPPING_LIST_RECEIVERS,
//       shoppingListId: snapshot.val().id,
//     }),
//   );
//   const receiversSnapshot = await receiversPath.once('value');
//
//   const shoppingListCard = FirebaseConverter.cardFromFirebase({
//     shoppingListId: snapshot.val().id,
//     shoppingListCardSnapshot: snapshot,
//     receiversSnapshot,
//   });
//
//   const productsListSnapshot = snapshot.child('productsList');
//
//   const productsList = FirebaseConverter.productsFromFirebase_V2(
//     productsListSnapshot,
//     shoppingListCard.id,
//   );
//
//   const shoppingList = {
//     id: shoppingListCard.id,
//     name: shoppingListCard.name,
//     totalItemsCount: shoppingListCard.totalItemsCount,
//     completedItemsCount: shoppingListCard.completedItemsCount,
//     createTimestamp: shoppingListCard.createTimestamp,
//     updateTimestamp: shoppingListCard.updateTimestamp,
//     creator: shoppingListCard.creator,
//     receivers: shoppingListCard.receivers,
//     shared: shoppingListCard.shared,
//     productsList,
//   };
//
//   if (FirebaseStorage.sendSharedShoppingLists.has(shoppingList.id)) {
//     FirebaseStorage.sendSharedShoppingLists.get(
//       shoppingList.id,
//     ).shoppingList = shoppingList;
//   } else if (FirebaseStorage.receivedSharedShoppingLists.has(shoppingList.id)) {
//     FirebaseStorage.receivedSharedShoppingLists.get(
//       shoppingList.id,
//     ).shoppingList = shoppingList;
//   } else {
//     console.log('UNKNOWN_ID');
//   }
//
//   FirebaseStorage.notifier.notify({
//     event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
//     data: shoppingList,
//   });
// };

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

  // Список ID не имеющихся на клиенте списков или спсиков, требующих обновления.
  const newSharedListsIdsArr = [];

  localSharedListIdsSet.clear();
  snapshot.forEach(child => {
    localSharedListIdsSet.add(child.key);

    const value = child.val();

    const listData = localSharedListMap.get(child.key);
    if (!listData || listData.updateTimestamp < value.updateTimestamp) {
      newSharedListsIdsArr.push({
        id: child.key,
        touched: value.touched,
        updateTimestamp: value.updateTimestamp,
      });
    }
  });

  // Составляем список карточек новых совместных списков.
  const newSharedListsCardsData = await Promise.all(
    newSharedListsIdsArr.map(async ({id, touched, updateTimestamp}) => {
      const sharedShoppingListCardPath = database().ref(
        FirebasePaths.getPath({
          pathType: FirebasePaths.paths.SHOPPING_LIST_CARD,
          shoppingListId: id,
        }),
      );
      const receiversPath = database().ref(
        FirebasePaths.getPath({
          pathType: FirebasePaths.paths.SHOPPING_LIST_RECEIVERS,
          shoppingListId: id,
        }),
      );

      const sharedShoppingListCardSnapshot = await sharedShoppingListCardPath.once(
        'value',
      );
      const receiversSnapshot = await receiversPath.once('value');

      const sharedListCard = FirebaseConverter.cardFromFirebase({
        shoppingListId: id,
        shoppingListCardSnapshot: sharedShoppingListCardSnapshot,
        receiversSnapshot,
      });

      return {sharedListCard, touched, updateTimestamp};
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

  // Добавляем новые карточки совместных списков клиенту.
  newSharedListsCardsData.forEach(sharedListCardData => {
    if (sharedListCardData) {
      const {sharedListCard, touched, updateTimestamp} = sharedListCardData;
      sharedListCard.productsList = [];

      const listData = localSharedListMap.get(sharedListCard.id);
      const shoppingList =
        listData && listData.shoppingList
          ? listData.shoppingList
          : sharedListCard;

      localSharedListMap.set(sharedListCard.id, {
        shoppingListCard: sharedListCard,
        shoppingList,
        touched,
        updateTimestamp,
      });
    }
  });

  FirebaseStorage.notifier.notify({
    event: changeEvent,
  });
};

// const processSharedPathSnapshot = async ({
//   snapshot,
//   localSharedListMap,
//   localSharedListIdsSet,
//   changeEvent,
// }) => {
//   if (snapshot.val() === null) {
//     // Удаляем с клиента соответсвующие списки покупок.
//     localSharedListMap.clear();
//     localSharedListIdsSet.clear();
//
//     FirebaseStorage.notifier.notify({
//       event: changeEvent,
//     });
//
//     return;
//   }
//
//   // Список ID не имеющихся на клиенте списков.
//   const newSharedListsIdsArr = [];
//
//   localSharedListIdsSet.clear();
//   snapshot.forEach(child => {
//     localSharedListIdsSet.add(child.key);
//     if (!localSharedListMap.has(child.key)) {
//       newSharedListsIdsArr.push({id: child.key, touched: child.val().touched});
//     }
//   });
//
//   // Составляем список новых совместных списков.
//   const newSharedListsData = await Promise.all(
//     newSharedListsIdsArr.map(async ({id, touched}) => {
//       const sharedShoppingListPath = database().ref(
//         FirebasePaths.getPath({
//           pathType: SHARED_SHOPPING_LIST,
//           pathId: id,
//         }),
//       );
//
//       const sharedShoppingListSnapshot = await sharedShoppingListPath.once(
//         'value',
//       );
//
//       const sharedListData = FirebaseConverter.listFromFirebase(
//         sharedShoppingListSnapshot,
//       );
//       sharedListData.touched = touched;
//
//       return sharedListData;
//     }),
//   );
//
//   // Ищем ID списков, которые были удалены с серверов, но находятся на клиенте.
//   const localSharedListsToRemoveIds = [];
//   localSharedListMap.forEach((list, id) => {
//     if (!localSharedListIdsSet.has(id)) {
//       localSharedListsToRemoveIds.push(id);
//     }
//   });
//
//   // Удаляем необходимые спсики с клиента.
//   localSharedListsToRemoveIds.forEach(id => {
//     localSharedListMap.delete(id);
//   });
//
//   // Добавляем новые совместные списки клиенту.
//   newSharedListsData.forEach(sharedListData => {
//     if (sharedListData) {
//       const {shoppingList, units, classes, touched} = sharedListData;
//       localSharedListMap.set(shoppingList.id, {
//         shoppingList,
//         units,
//         classes,
//         touched,
//       });
//     }
//   });
//
//   FirebaseStorage.notifier.notify({
//     event: changeEvent,
//   });
// };
