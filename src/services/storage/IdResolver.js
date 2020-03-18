export class IdResolver {
  static resolve(shoppingListId) {
    if (shoppingListId.toString().match(/[a-z]/i)) {
      return IdResolver.types.FIREBASE;
    } else {
      return IdResolver.types.LOCAL;
    }
  }
}

IdResolver.types = {
  LOCAL: 'LOCAL',
  FIREBASE: 'FIREBASE',
};
