import {SqliteStorageImpl_V2} from './sqlite-storage/SqliteStorageImpl_V2';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';
import {
  SHOPPING_LIST_COMPLETED,
  SHOPPING_LIST_NOT_COMPLETED,
} from './data/shoppingListStatus';

export class Storage {
  static async isInitialized() {
    const result = await SqliteStorageImpl_V2.isInitialized();
    return result.length > 0;
  }

  static async init() {
    await SqliteStorageImpl_V2.init();
    await SqliteStorageHelper.insertInitialUnits();
    await SqliteStorageHelper.insertInitialClases();
  }

  static async getAllShoppingLists() {
    const shoppingListsTableData = await SqliteStorageImpl_V2.getShoppingLists();

    const shoppingLists = [];
    for (let i = 0; i < shoppingListsTableData.length; ++i) {
      shoppingLists.push(shoppingListsTableData.item(i));
    }

    return shoppingLists;
  }

  static async createShoppingList({listName}) {
    try {
      return await SqliteStorageImpl_V2.addShoppingList({
        name: listName,
        status: SHOPPING_LIST_NOT_COMPLETED,
        timestamp: Date.now(),
      });
    } catch (e) {
      throw Error('Storage->createShoppingList(): ' + e);
    }
  }
}
