import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';
import {FirebaseStorage} from './firebase-storage/FirebaseStorage';
import {StorageNotifier} from './storage-notifier/StorageNotifier';

export class Storage {
  static async subscribe({
    shoppingListId,
    productId,
    event,
    handler,
    once = false,
  }) {
    const unsubscribe = once
      ? () => {}
      : Storage.notifier.subscribe({
          entityIds: {shoppingListId, productId},
          event,
          handler,
        });

    let data;
    if (event === Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED) {
      data = await SqliteStorage.getShoppingLists();
    } else if (event === Storage.events.SHOPPING_LIST_CHANGED) {
      data = await SqliteStorage.getShoppingList(shoppingListId);
    } else if (event === Storage.events.SIGN_IN_INFO_CHANGED) {
      data = await SqliteStorage.getLocalSignInInfo();
    }

    return {unsubscribe, data};
  }

  static async init() {
    this.setStorageSubscriptions();

    const result = await SqliteStorage.isInitialized();
    if (result.length <= 0) {
      await SqliteStorage.init();
      await SqliteStorageHelper.insertInitialUnits();
      await SqliteStorageHelper.insertInitialClasses();
    }

    const localSignInInfo = await SqliteStorage.getLocalSignInInfo();
    await FirebaseStorage.init(localSignInInfo);
  }

  static async createShoppingList({listName}) {
    return await SqliteStorage.addShoppingList(listName);
  }

  static async removeShoppingList({shoppingListId}) {
    return await SqliteStorage.removeShoppingList(shoppingListId);
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
  }) {
    return await SqliteStorage.addShoppingListItem({
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      classId,
    });
  }

  static async setProductStatus({shoppingListId, productId, status}) {
    await SqliteStorage.setShoppingListItemStatus({
      shoppingListId,
      productId,
      status,
    });
  }

  static async updateSignInInfo({phone, email, password}) {
    await SqliteStorage.updateLocalSignInInfo({phone, email, password});
  }

  static async removeSignInInfo() {
    await SqliteStorage.removeLocalSignInInfo();
  }

  static async getUnits({shoppingListId}) {
    return await SqliteStorage.getUnits();
  }

  static async getClasses({shoppingListId}) {
    return await SqliteStorage.getClasses();
  }

  static off() {
    FirebaseStorage.off();
    this.removeStorageSubscriptions();
  }

  static setStorageSubscriptions() {
    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_SHOPPING_LIST_ADDED,
        handler: async () => {
          const shoppingLists = await SqliteStorage.getShoppingLists();

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_SHOPPING_LIST_REMOVED,
        handler: async () => {
          const shoppingLists = await SqliteStorage.getShoppingLists();

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_PRODUCT_ADDED,
        handler: async ({shoppingListId}) => {
          const shoppingLists = await SqliteStorage.getShoppingLists();
          const shoppingList = await SqliteStorage.getShoppingList(
            shoppingListId,
          );

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
          Storage.notifier.notify({
            entityIds: {shoppingListId},
            event: Storage.events.SHOPPING_LIST_CHANGED,
            data: shoppingList,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_PRODUCT_UPDATED,
        handler: async ({shoppingListId}) => {
          const shoppingLists = await SqliteStorage.getShoppingLists();
          const shoppingList = await SqliteStorage.getShoppingList(
            shoppingListId,
          );

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
          Storage.notifier.notify({
            entityIds: {shoppingListId},
            event: Storage.events.SHOPPING_LIST_CHANGED,
            data: shoppingList,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_SIGN_IN_INFO_UPDATED,
        handler: ({localSignInInfo}) => {
          Storage.notifier.notify({
            event: Storage.events.SIGN_IN_INFO_CHANGED,
            data: localSignInInfo,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_SIGN_IN_INFO_REMOVED,
        handler: ({localSignInInfo}) => {
          Storage.notifier.notify({
            event: Storage.events.SIGN_IN_INFO_CHANGED,
            data: localSignInInfo,
          });
        },
      }),
    );
  }

  static removeStorageSubscriptions() {
    Storage.localSubscriptions.forEach(unsubscribeFunc => {
      unsubscribeFunc();
    });

    Storage.localSubscriptions.length = 0;
  }
}

Storage.events = {
  LIST_OF_SHOPPING_LISTS_CHANGED: 'LIST_OF_SHOPPING_LISTS_CHANGED',
  SHOPPING_LIST_CHANGED: 'SHOPPING_LIST_CHANGED',
  SIGN_IN_INFO_CHANGED: 'SIGN_IN_INFO_CHANGED',
};
Storage.notifier = new StorageNotifier({});
Storage.localSubscriptions = [];

// export class Storage {
//   static async subscribe({
//     shoppingListId,
//     productId,
//     event,
//     handler,
//     once = false,
//   }) {
//     const unsubscribe = once
//       ? () => {}
//       : StorageEvents.subscribe({
//           entityIds: {shoppingListId, productId},
//           event,
//           handler,
//         });
//
//     let data;
//     if (event === LIST_OF_SHOPPING_LISTS_CHANGED) {
//       data = await SqliteStorage.getShoppingLists();
//     } else if (event === SHOPPING_LIST_CHANGED) {
//       data = await SqliteStorage.getShoppingList(shoppingListId);
//     } else if (event === SIGN_IN_INFO_CHANGED) {
//       data = await SqliteStorage.getLocalSignInInfo();
//     }
//
//     return {unsubscribe, data};
//   }
//
//   static async init() {
//     const result = await SqliteStorage.isInitialized();
//     if (result.length <= 0) {
//       await SqliteStorage.init();
//       await SqliteStorageHelper.insertInitialUnits();
//       await SqliteStorageHelper.insertInitialClasses();
//     }
//
//     const localSignInInfo = await SqliteStorage.getLocalSignInInfo();
//     await FirebaseStorage.init(localSignInInfo);
//   }
//
//   static async createShoppingList({listName}) {
//     const newShoppingListId = await SqliteStorage.addShoppingList(listName);
//     const shoppingLists = await SqliteStorage.getShoppingLists();
//
//     StorageEvents.fireEvent({
//       event: LIST_OF_SHOPPING_LISTS_CHANGED,
//       data: shoppingLists,
//     });
//
//     return newShoppingListId;
//   }
//
//   static async removeShoppingList({shoppingListId}) {
//     const {
//       removedShoppingListsCount,
//       removedProductsCount,
//     } = await SqliteStorage.removeShoppingList(shoppingListId);
//     const shoppingLists = await SqliteStorage.getShoppingLists();
//
//     StorageEvents.fireEvent({
//       event: LIST_OF_SHOPPING_LISTS_CHANGED,
//       data: shoppingLists,
//     });
//
//     return {removedShoppingListsCount, removedProductsCount};
//   }
//
//   static async addProduct({
//     shoppingListId,
//     name,
//     quantity,
//     unitId,
//     note,
//     classId,
//   }) {
//     const productId = await SqliteStorage.addShoppingListItem({
//       shoppingListId,
//       name,
//       quantity,
//       unitId,
//       note,
//       classId,
//     });
//
//     const shoppingLists = await SqliteStorage.getShoppingLists();
//     const shoppingList = await SqliteStorage.getShoppingList(shoppingListId);
//
//     StorageEvents.fireEvent({
//       event: LIST_OF_SHOPPING_LISTS_CHANGED,
//       data: shoppingLists,
//     });
//     StorageEvents.fireEvent({
//       entityIds: {shoppingListId},
//       event: SHOPPING_LIST_CHANGED,
//       data: shoppingList,
//     });
//
//     return productId;
//   }
//
//   static async setProductStatus({shoppingListId, productId, status}) {
//     await SqliteStorage.setShoppingListItemStatus({
//       shoppingListId,
//       productId,
//       status,
//     });
//
//     const shoppingLists = await SqliteStorage.getShoppingLists();
//     const shoppingList = await SqliteStorage.getShoppingList(shoppingListId);
//
//     StorageEvents.fireEvent({
//       event: LIST_OF_SHOPPING_LISTS_CHANGED,
//       data: shoppingLists,
//     });
//     StorageEvents.fireEvent({
//       entityIds: {shoppingListId},
//       event: SHOPPING_LIST_CHANGED,
//       data: shoppingList,
//     });
//   }
//
//   static async updateSignInInfo({phone, email, password}) {
//     await SqliteStorage.updateLocalSignInInfo({phone, email, password});
//
//     const localSignInInfo = await SqliteStorage.getLocalSignInInfo();
//
//     StorageEvents.fireEvent({
//       event: SIGN_IN_INFO_CHANGED,
//       data: localSignInInfo,
//     });
//   }
//
//   static async removeSignInInfo() {
//     await SqliteStorage.removeLocalSignInInfo();
//
//     const localSignInInfo = await SqliteStorage.getLocalSignInInfo();
//
//     StorageEvents.fireEvent({
//       event: SIGN_IN_INFO_CHANGED,
//       data: localSignInInfo,
//     });
//   }
//
//   static async getUnits({shoppingListId}) {
//     return await SqliteStorage.getUnits();
//   }
//
//   static async getClasses({shoppingListId}) {
//     return await SqliteStorage.getClasses();
//   }
//
//   static off() {
//     FirebaseStorage.off();
//   }
// }
