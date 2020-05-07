import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';
import {FirebaseStorage} from './firebase-storage/FirebaseStorage';
import {StorageNotifier} from '../common-data/storage-notifier/StorageNotifier';
import {StorageDataExtractor} from './StorageDataExtractor';
import {StorageIdResolver} from './StorageIdResolver';

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
      data = await StorageDataExtractor.getShoppingLists();
    } else if (event === Storage.events.SHOPPING_LIST_CHANGED) {
      data = await StorageDataExtractor.getShoppingList(shoppingListId, once);
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

    await FirebaseStorage.init();
  }

  static async createShoppingList({listName, creator}) {
    return await SqliteStorage.addShoppingList(listName, creator);
  }

  static async removeShoppingList({shoppingListId}) {
    const listType = StorageIdResolver.resolve(shoppingListId);
    let currentUserIsOwner = true;

    if (listType === StorageIdResolver.listTypes.LOCAL) {
      await SqliteStorage.removeShoppingList(shoppingListId);
    } else {
      currentUserIsOwner = await FirebaseStorage.removeShoppingList(
        shoppingListId,
      );
    }

    return {listType, currentUserIsOwner};
  }

  static async makeShoppingListLocalCopy({shoppingListId}) {
    console.log('Storage.makeShoppingListLocalCopy(): ' + shoppingListId);

    const shoppingList = await StorageDataExtractor.getShoppingList(
      shoppingListId,
      true,
    );

    const copiedShoppingListId = await SqliteStorage.addShoppingList(
      shoppingList.name,
    );

    await Promise.all(
      shoppingList.productsList.map(async product => {
        await SqliteStorage.addProduct({
          shoppingListId: copiedShoppingListId,
          name: product.name,
          unitId: product.unitId,
          classId: product.classId,
          note: product.note,
          status: product.completionStatus,
        });
      }),
    );

    return copiedShoppingListId;
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
  }) {
    const listType = StorageIdResolver.resolve(shoppingListId);
    let firebaseUpdateData;

    if (listType === StorageIdResolver.listTypes.LOCAL) {
      await SqliteStorage.addProduct({
        shoppingListId,
        name,
        quantity,
        unitId,
        note,
        classId,
      });
    } else if (listType === StorageIdResolver.listTypes.FIREBASE) {
      firebaseUpdateData = await FirebaseStorage.addProduct({
        shoppingListId,
        name,
        quantity,
        unitId,
        note,
        classId,
      });
    }
    return {listType, firebaseUpdateData};
  }

  static async setProductStatus({shoppingListId, productId, status}) {
    const listType = StorageIdResolver.resolve(shoppingListId);
    let firebaseUpdateData;

    if (listType === StorageIdResolver.listTypes.LOCAL) {
      await SqliteStorage.setProductStatus({
        shoppingListId,
        productId,
        status,
      });
    } else if (listType === StorageIdResolver.listTypes.FIREBASE) {
      firebaseUpdateData = await FirebaseStorage.setProductStatus({
        shoppingListId,
        productId,
        status,
      });
    }
    return {listType, firebaseUpdateData};
  }
  static async removeProduct({shoppingListId, productId}) {
    const listType = StorageIdResolver.resolve(shoppingListId);
    let firebaseUpdateData;

    if (listType === StorageIdResolver.listTypes.LOCAL) {
      await SqliteStorage.removeProduct({shoppingListId, productId});
    } else if (listType === StorageIdResolver.listTypes.FIREBASE) {
      firebaseUpdateData = await FirebaseStorage.removeProduct({
        shoppingListId,
        productId,
      });
    }

    return {listType, firebaseUpdateData};
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
          const shoppingLists = await StorageDataExtractor.getShoppingLists();

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
          const shoppingLists = await StorageDataExtractor.getShoppingLists();

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_PRODUCTS_ADDED,
        handler: ({shoppingListId, products}) => {
          Storage.notifier.notify({
            event: Storage.events.PRODUCTS_ADDED,
            data: {shoppingListId, products},
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_PRODUCTS_UPDATED,
        handler: ({shoppingListId, products}) => {
          Storage.notifier.notify({
            event: Storage.events.PRODUCTS_UPDATED,
            data: {shoppingListId, products},
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      SqliteStorage.subscribe({
        event: SqliteStorage.events.LOCAL_PRODUCTS_DELETED,
        handler: ({shoppingListId, products}) => {
          Storage.notifier.notify({
            event: Storage.events.PRODUCTS_DELETED,
            data: {shoppingListId, products},
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
        handler: async () => {
          console.log('STORAGE->SHARED_SEND_LISTS_CHANGED');

          const shoppingLists = await StorageDataExtractor.getShoppingLists();

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_CHANGED,
        handler: async () => {
          console.log('STORAGE->SHARED_RECEIVED_LISTS_CHANGED');

          const shoppingLists = await StorageDataExtractor.getShoppingLists();

          Storage.notifier.notify({
            event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
            data: shoppingLists,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_PRODUCTS_ADDED,
        handler: ({shoppingListId, products}) => {
          Storage.notifier.notify({
            event: Storage.events.PRODUCTS_ADDED,
            data: {shoppingListId, products},
          });
        },
      }),
    );
    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_PRODUCTS_UPDATED,
        handler: ({shoppingListId, products}) => {
          Storage.notifier.notify({
            event: Storage.events.PRODUCTS_UPDATED,
            data: {shoppingListId, products},
          });
        },
      }),
    );
    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_PRODUCTS_DELETED,
        handler: ({shoppingListId, products}) => {
          Storage.notifier.notify({
            event: Storage.events.PRODUCTS_DELETED,
            data: {shoppingListId, products},
          });
        },
      }),
    );

    // // ===
    // // =====
    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_SEND_LISTS_LOADING,
        handler: () => {
          Storage.notifier.notify({
            event: Storage.events.SEND_LIST_OF_SHOPPING_LISTS_LOADING,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_SEND_LISTS_LOADED,
        handler: () => {
          Storage.notifier.notify({
            event: Storage.events.SEND_LIST_OF_SHOPPING_LISTS_LOADED,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_LOADING,
        handler: () => {
          Storage.notifier.notify({
            event: Storage.events.RECEIVED_LIST_OF_SHOPPING_LISTS_LOADING,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_LOADED,
        handler: () => {
          Storage.notifier.notify({
            event: Storage.events.RECEIVED_LIST_OF_SHOPPING_LISTS_LOADED,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_LIST_LOADING,
        handler: listId => {
          Storage.notifier.notify({
            event: Storage.events.SHARED_LIST_LOADING,
            data: listId,
          });
        },
      }),
    );

    Storage.localSubscriptions.push(
      FirebaseStorage.subscribe({
        event: FirebaseStorage.events.SHARED_LIST_LOADED,
        handler: listId => {
          Storage.notifier.notify({
            event: Storage.events.SHARED_LIST_LOADED,
            data: listId,
          });
        },
      }),
    );
    // // =====
    // // ===
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

  SEND_LIST_OF_SHOPPING_LISTS_LOADING: 'SEND_LIST_OF_SHOPPING_LISTS_LOADING',
  SEND_LIST_OF_SHOPPING_LISTS_LOADED: 'SEND_LIST_OF_SHOPPING_LISTS_LOADED',

  RECEIVED_LIST_OF_SHOPPING_LISTS_LOADING:
    'RECEIVED_LIST_OF_SHOPPING_LISTS_LOADING',
  RECEIVED_LIST_OF_SHOPPING_LISTS_LOADED:
    'RECEIVED_LIST_OF_SHOPPING_LISTS_LOADED',

  SHOPPING_LIST_CHANGED: 'SHOPPING_LIST_CHANGED',

  SHARED_LIST_LOADING: 'SHARED_LIST_LOADING',
  SHARED_LIST_LOADED: 'SHARED_LIST_LOADED',

  PRODUCTS_ADDED: 'PRODUCTS_ADDED',
  PRODUCTS_UPDATED: 'PRODUCTS_UPDATED',
  PRODUCTS_DELETED: 'PRODUCTS_DELETED',
};
Storage.notifier = new StorageNotifier({});
Storage.localSubscriptions = [];

// static setStorageSubscriptions() {
//   Storage.localSubscriptions.push(
//     SqliteStorage.subscribe({
//       event: SqliteStorage.events.LOCAL_SHOPPING_LIST_ADDED,
//       handler: async () => {
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     SqliteStorage.subscribe({
//       event: SqliteStorage.events.LOCAL_SHOPPING_LIST_REMOVED,
//       handler: async () => {
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     SqliteStorage.subscribe({
//       event: SqliteStorage.events.LOCAL_PRODUCT_ADDED,
//       handler: async ({shoppingListId}) => {
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         const shoppingList = await StorageDataExtractor.getShoppingList(
//           shoppingListId,
//         );
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//         Storage.notifier.notify({
//           entityIds: {shoppingListId},
//           event: Storage.events.SHOPPING_LIST_CHANGED,
//           data: shoppingList,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     SqliteStorage.subscribe({
//       event: SqliteStorage.events.LOCAL_PRODUCT_UPDATED,
//       handler: async ({shoppingListId}) => {
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         const shoppingList = await StorageDataExtractor.getShoppingList(
//           shoppingListId,
//         );
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//         Storage.notifier.notify({
//           entityIds: {shoppingListId},
//           event: Storage.events.SHOPPING_LIST_CHANGED,
//           data: shoppingList,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
//       handler: async () => {
//         console.log('STORAGE->SHARED_SEND_LISTS_CHANGED');
//
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_CHANGED,
//       handler: async () => {
//         console.log('STORAGE->SHARED_RECEIVED_LISTS_CHANGED');
//
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
//       handler: async shoppingList => {
//         const shoppingLists = await StorageDataExtractor.getShoppingLists();
//
//         Storage.notifier.notify({
//           event: Storage.events.LIST_OF_SHOPPING_LISTS_CHANGED,
//           data: shoppingLists,
//         });
//         Storage.notifier.notify({
//           entityIds: {shoppingListId: shoppingList.id},
//           event: Storage.events.SHOPPING_LIST_CHANGED,
//           data: shoppingList,
//         });
//       },
//     }),
//   );
//
//   // ===
//   // =====
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_SEND_LISTS_LOADING,
//       handler: () => {
//         Storage.notifier.notify({
//           event: Storage.events.SEND_LIST_OF_SHOPPING_LISTS_LOADING,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_SEND_LISTS_LOADED,
//       handler: () => {
//         Storage.notifier.notify({
//           event: Storage.events.SEND_LIST_OF_SHOPPING_LISTS_LOADED,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_LOADING,
//       handler: () => {
//         Storage.notifier.notify({
//           event: Storage.events.RECEIVED_LIST_OF_SHOPPING_LISTS_LOADING,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_RECEIVED_LISTS_LOADED,
//       handler: () => {
//         Storage.notifier.notify({
//           event: Storage.events.RECEIVED_LIST_OF_SHOPPING_LISTS_LOADED,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_LIST_LOADING,
//       handler: listId => {
//         Storage.notifier.notify({
//           event: Storage.events.SHARED_LIST_LOADING,
//           data: listId,
//         });
//       },
//     }),
//   );
//
//   Storage.localSubscriptions.push(
//     FirebaseStorage.subscribe({
//       event: FirebaseStorage.events.SHARED_LIST_LOADED,
//       handler: listId => {
//         Storage.notifier.notify({
//           event: Storage.events.SHARED_LIST_LOADED,
//           data: listId,
//         });
//       },
//     }),
//   );
//   // =====
//   // ===
// }
