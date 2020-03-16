import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {FirebaseStorage} from './firebase-storage/FirebaseStorage';

export class StorageDataExtractor {
  static async getShoppingLists() {
    const localShoppingLists = await SqliteStorage.getShoppingLists();
    const sharedShoppingLists = await FirebaseStorage.getShoppingLists();
    localShoppingLists.push(...sharedShoppingLists);

    return localShoppingLists;
  }

  static async getShoppingList(shoppingListId) {
    let shoppingList = await FirebaseStorage.getShoppingList(shoppingListId);
    if (!shoppingList) {
      return await SqliteStorage.getShoppingList(shoppingListId);
    }

    return shoppingList;
  }

  static async getLocalSignInInfo() {
    return await SqliteStorage.getLocalSignInInfo();
  }
}
