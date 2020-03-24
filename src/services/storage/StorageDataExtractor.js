import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {FirebaseStorage} from './firebase-storage/FirebaseStorage';
import {StorageIdResolver} from './StorageIdResolver';

export class StorageDataExtractor {
  static async getShoppingLists() {
    const localShoppingLists = await SqliteStorage.getShoppingLists();
    const sharedShoppingLists = await FirebaseStorage.getShoppingLists();
    localShoppingLists.push(...sharedShoppingLists);

    return localShoppingLists;
  }

  static async getShoppingList(shoppingListId, once) {
    const listType = StorageIdResolver.resolve(shoppingListId);
    if (listType === StorageIdResolver.listTypes.LOCAL) {
      return await SqliteStorage.getShoppingList(shoppingListId);
    } else if (listType === StorageIdResolver.listTypes.FIREBASE) {
      return await FirebaseStorage.getShoppingList(shoppingListId, once);
    } else {
      console.log(
        'StorageDataExtractor->getShoppingList(): UNKNOWN_ID: ' + listType,
      );
      return undefined;
    }
  }

  static async getLocalSignInInfo() {
    return await SqliteStorage.getLocalSignInInfo();
  }
}
