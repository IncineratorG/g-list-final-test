import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';
import {
  LIST_OF_SHOPPING_LISTS_CHANGED,
  SHOPPING_LIST_CHANGED,
  SIGN_IN_INFO_CHANGED,
} from './storageEventTypes';
import {StorageEvents} from './StorageEvents';
import {FirebaseStorage} from './firebase-storage/FirebaseStorage';

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
      : StorageEvents.subscribe({
          entityIds: {shoppingListId, productId},
          event,
          handler,
        });

    let data;
    if (event === LIST_OF_SHOPPING_LISTS_CHANGED) {
      data = await SqliteStorage.getShoppingLists();
    } else if (event === SHOPPING_LIST_CHANGED) {
      data = await SqliteStorage.getShoppingList(shoppingListId);
    } else if (event === SIGN_IN_INFO_CHANGED) {
      data = await SqliteStorage.getLocalSignInInfo();
    }

    return {unsubscribe, data};
  }

  static async init() {
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
    const newShoppingListId = await SqliteStorage.addShoppingList(listName);
    const shoppingLists = await SqliteStorage.getShoppingLists();

    StorageEvents.fireEvent({
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

    StorageEvents.fireEvent({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });

    return {removedShoppingListsCount, removedProductsCount};
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

    StorageEvents.fireEvent({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });
    StorageEvents.fireEvent({
      entityIds: {shoppingListId},
      event: SHOPPING_LIST_CHANGED,
      data: shoppingList,
    });

    return productId;
  }

  static async setProductStatus({shoppingListId, productId, status}) {
    await SqliteStorage.setShoppingListItemStatus({
      shoppingListId,
      productId,
      status,
    });

    const shoppingLists = await SqliteStorage.getShoppingLists();
    const shoppingList = await SqliteStorage.getShoppingList(shoppingListId);

    StorageEvents.fireEvent({
      event: LIST_OF_SHOPPING_LISTS_CHANGED,
      data: shoppingLists,
    });
    StorageEvents.fireEvent({
      entityIds: {shoppingListId},
      event: SHOPPING_LIST_CHANGED,
      data: shoppingList,
    });
  }

  static async updateSignInInfo({phone, email, password}) {
    await SqliteStorage.updateLocalSignInInfo({phone, email, password});

    const localSignInInfo = await SqliteStorage.getLocalSignInInfo();

    StorageEvents.fireEvent({
      event: SIGN_IN_INFO_CHANGED,
      data: localSignInInfo,
    });
  }

  static async removeSignInInfo() {
    await SqliteStorage.removeLocalSignInInfo();

    const localSignInInfo = await SqliteStorage.getLocalSignInInfo();

    StorageEvents.fireEvent({
      event: SIGN_IN_INFO_CHANGED,
      data: localSignInInfo,
    });
  }

  static async getUnits({shoppingListId}) {
    return await SqliteStorage.getUnits();
  }

  static async getClasses({shoppingListId}) {
    return await SqliteStorage.getClasses();
  }

  static off() {
    FirebaseStorage.off();
  }
}
