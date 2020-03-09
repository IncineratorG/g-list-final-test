import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';
import {
  LIST_OF_SHOPPING_LISTS_CHANGED,
  SHOPPING_LIST_CHANGED,
} from './storageEventTypes';
import {StorageEvents} from './StorageEvents';

export class Storage {
  static async subscribe({shoppingListId, productId, event, handler}) {
    const unsubscribe = StorageEvents.subscribe({
      entityIds: {shoppingListId, productId},
      event,
      handler,
    });

    let data;
    if (event === LIST_OF_SHOPPING_LISTS_CHANGED) {
      data = await SqliteStorage.getShoppingLists();
    } else if (event === SHOPPING_LIST_CHANGED) {
      data = await SqliteStorage.getShoppingList(shoppingListId);
    }

    return {unsubscribe, data};
  }

  static async isInitialized() {
    const result = await SqliteStorage.isInitialized();
    return result.length > 0;
  }

  static async init() {
    await SqliteStorage.init();
    await SqliteStorageHelper.insertInitialUnits();
    await SqliteStorageHelper.insertInitialClasses();
  }

  static async createShoppingList({listName}) {
    const newShoppingListId = await SqliteStorage.addShoppingList(listName);
    const shoppingLists = await SqliteStorage.getShoppingLists();

    StorageEvents.notify({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });

    return newShoppingListId;
  }

  static async removeShoppingList({shoppingListId}) {
    const {
      removedShoppingListsCount,
      removedProductsCount,
    } = await SqliteStorage.removeShoppingList(shoppingListId);
    const shoppingLists = await SqliteStorage.getShoppingLists();

    StorageEvents.notify({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });

    return {removedShoppingListsCount, removedProductsCount};
  }

  static async getShoppingListName({shoppingListId}) {
    return await SqliteStorage.getShoppingListName(shoppingListId);
  }

  static async getUnits({shoppingListId}) {
    return await SqliteStorage.getUnits();
  }

  static async getClasses({shoppingListId}) {
    return await SqliteStorage.getClasses();
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
  }) {
    const productId = await SqliteStorage.addShoppingListItem({
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      classId,
    });

    const shoppingLists = await SqliteStorage.getShoppingLists();
    const shoppingList = await SqliteStorage.getShoppingList(shoppingListId);

    StorageEvents.notify({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });
    StorageEvents.notify({
      entityIds: {shoppingListId},
      event: SHOPPING_LIST_CHANGED,
      data: shoppingList,
    });

    return productId;
  }

  static async setProductStatus({shoppingListId, productId, status}) {
    await SqliteStorage.setShoppingListItemStatus({
      productId,
      status,
    });

    const shoppingLists = await SqliteStorage.getShoppingLists();
    const shoppingList = await SqliteStorage.getShoppingList(shoppingListId);

    StorageEvents.notify({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });
    StorageEvents.notify({
      entityIds: {shoppingListId},
      event: SHOPPING_LIST_CHANGED,
      data: shoppingList,
    });
  }

  static async getProductsList({shoppingListId}) {
    return await SqliteStorage.getShoppingListItems(shoppingListId);
  }

  static async getSignInInfo() {
    const signInInfoData = await SqliteStorage.getSignInInfo();
    if (signInInfoData.length > 0) {
      return {
        phone: signInInfoData.item(0).phone,
        email: signInInfoData.item(0).email,
        password: signInInfoData.item(0).password,
      };
    }
  }

  static async updateSignInInfo({phone, email, password}) {
    await SqliteStorage.updateSignInInfo({phone, email, password});
  }

  static async removeSignInInfo() {
    await SqliteStorage.removeSignInInfo();
  }
}

// export class Storage {
//   static async isInitialized() {
//     const result = await SqliteStorage.isInitialized();
//     return result.length > 0;
//   }
//
//   static async init() {
//     await SqliteStorage.init();
//     await SqliteStorageHelper.insertInitialUnits();
//     await SqliteStorageHelper.insertInitialClasses();
//   }
//
//   static async getAllShoppingLists() {
//     const shoppingListsTableData = await SqliteStorage.getShoppingLists();
//
//     const shoppingLists = [];
//     for (let i = 0; i < shoppingListsTableData.length; ++i) {
//       shoppingLists.push(shoppingListsTableData.item(i));
//     }
//
//     return shoppingLists;
//   }
//
//   static async createShoppingList({listName}) {
//     try {
//       return await SqliteStorage.addShoppingList(listName);
//     } catch (e) {
//       throw new Error('Storage->createShoppingList(): ' + e);
//     }
//   }
//
//   static async getShoppingListName(shoppingListId) {
//     try {
//       const nameData = await SqliteStorage.getShoppingListName(shoppingListId);
//
//       if (nameData.length) {
//         return nameData.item(0).listName;
//       } else {
//         return '';
//       }
//     } catch (e) {
//       throw new Error('Storage->getShoppingListName(): ' + e);
//     }
//   }
//
//   static async getUnits() {
//     try {
//       const unitsData = await SqliteStorage.getUnits();
//
//       const units = [];
//       for (let i = 0; i < unitsData.length; ++i) {
//         units.push(unitsData.item(i));
//       }
//
//       return units;
//     } catch (e) {
//       throw new Error('Storage->getUnits(): ' + e);
//     }
//   }
//
//   static async getClasses() {
//     try {
//       const classesData = await SqliteStorage.getClasses();
//
//       const classes = [];
//       for (let i = 0; i < classesData.length; ++i) {
//         classes.push(classesData.item(i));
//       }
//
//       return classes;
//     } catch (e) {
//       throw new Error('Storage->getClasses(): ' + e);
//     }
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
//     try {
//       return await SqliteStorage.addShoppingListItem({
//         shoppingListId,
//         name,
//         quantity,
//         unitId,
//         note,
//         classId,
//       });
//     } catch (e) {
//       throw new Error('Storage->addProduct(): ' + e);
//     }
//   }
//
//   static async setProductStatus({productId, status}) {
//     try {
//       return await SqliteStorage.setShoppingListItemStatus({
//         productId,
//         status,
//       });
//     } catch (e) {
//       throw new Error('Storage->setProductStatus(): ' + e);
//     }
//   }
//
//   static async getProductsList(shoppingListId) {
//     try {
//       const productsListData = await SqliteStorage.getShoppingListItems(
//         shoppingListId,
//       );
//
//       const productsList = [];
//       for (let i = 0; i < productsListData.length; ++i) {
//         productsList.push(productsListData.item(i));
//       }
//
//       return productsList;
//     } catch (e) {
//       throw new Error('Storage->getProductsList(): ' + e);
//     }
//   }
//
//   static async removeShoppingList(shoppingListId) {
//     try {
//       await SqliteStorage.removeShoppingList(shoppingListId);
//     } catch (e) {
//       throw new Error('Storage->removeShoppingList(): ' + e);
//     }
//   }
//
//   static async getSignInInfo() {
//     const signInInfoData = await SqliteStorage.getSignInInfo();
//     if (signInInfoData.length > 0) {
//       return {
//         phone: signInInfoData.item(0).phone,
//         email: signInInfoData.item(0).email,
//         password: signInInfoData.item(0).password,
//       };
//     }
//   }
//
//   static async updateSignInInfo({phone, email, password}) {
//     try {
//       await SqliteStorage.updateSignInInfo({phone, email, password});
//     } catch (e) {
//       throw new Error('Storage->updateSignInInfo(): ' + e);
//     }
//   }
//
//   static async removeSignInInfo() {
//     try {
//       await SqliteStorage.removeSignInInfo();
//     } catch (e) {
//       throw new Error('Storage->removeSignInInfo(): ' + e);
//     }
//   }
// }
