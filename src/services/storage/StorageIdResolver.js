export class StorageIdResolver {
  static resolve(shoppingListId) {
    if (!shoppingListId) {
      return StorageIdResolver.listTypes.UNKNOWN;
    }

    if (shoppingListId.toString().match(/[a-z]/i)) {
      return StorageIdResolver.listTypes.FIREBASE;
    } else {
      return StorageIdResolver.listTypes.LOCAL;
    }
  }
}

StorageIdResolver.listTypes = {
  LOCAL: 'LOCAL',
  FIREBASE: 'FIREBASE',
  UNKNOWN: 'UNKNOWN',
};
