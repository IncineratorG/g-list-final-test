export class FirebasePaths {
  static getPath({pathType, userId, shoppingListId, productId}) {
    switch (pathType) {
      case FirebasePaths.paths.USERS_ROOT: {
        return '/users/';
      }

      case FirebasePaths.paths.USER_SEND: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return '/users/' + userId + '/send';
        }
      }

      case FirebasePaths.paths.USER_SEND_DELIM: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return '/users/' + userId + '/send/';
        }
      }

      case FirebasePaths.paths.USER_RECEIVED: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return '/users/' + userId + '/received';
        }
      }

      case FirebasePaths.paths.USER_RECEIVED_DELIM: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return '/users/' + userId + '/received/';
        }
      }

      case FirebasePaths.paths.SHOPPING_LISTS_DATA_ROOT: {
        return '/shared/shoppingLists';
      }

      case FirebasePaths.paths.SHOPPING_LISTS_DATA_ROOT_DELIM: {
        return '/shared/shoppingLists/';
      }

      case FirebasePaths.paths.SHOPPING_LIST_DATA: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return '/shared/shoppingLists/' + shoppingListId;
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_DATA_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return '/shared/shoppingLists/' + shoppingListId + '/';
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_CARD: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            '/shared/shoppingLists/' + shoppingListId + '/shoppingListCard'
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_CARD_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            '/shared/shoppingLists/' + shoppingListId + '/shoppingListCard/'
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return '/shared/shoppingLists/' + shoppingListId + '/shoppingList';
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return '/shared/shoppingLists/' + shoppingListId + '/shoppingList/';
        }
      }

      default: {
        console.log('FirebasePaths->getPath() => UNKNOWN_PATH: ' + pathType);
        return '';
      }
    }
  }
}

FirebasePaths.paths = {
  USERS_ROOT: 'USERS_ROOT',
  USER_SEND: 'USER_SEND',
  USER_SEND_DELIM: 'USER_SEND_DELIM',
  USER_RECEIVED: 'USER_RECEIVED',
  USER_RECEIVED_DELIM: 'USER_RECEIVED_DELIM',
  SHOPPING_LISTS_DATA_ROOT: 'SHOPPING_LISTS_DATA_ROOT',
  SHOPPING_LISTS_DATA_ROOT_DELIM: 'SHOPPING_LISTS_DATA_ROOT_DELIM',
  SHOPPING_LIST_DATA: 'SHOPPING_LIST_DATA',
  SHOPPING_LIST_DATA_DELIM: 'SHOPPING_LIST_DATA_DELIM',
  SHOPPING_LIST_CARD: 'SHOPPING_LIST_CARD',
  SHOPPING_LIST_CARD_DELIM: 'SHOPPING_LIST_CARD_DELIM',
  SHOPPING_LIST: 'SHOPPING_LIST',
  SHOPPING_LIST_DELIM: 'SHOPPING_LIST_DELIM',
};
