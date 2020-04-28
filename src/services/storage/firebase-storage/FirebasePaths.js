export class FirebasePaths {
  static getPath({pathType, userId, shoppingListId, productId}) {
    switch (pathType) {
      case FirebasePaths.paths.USER: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.USERS +
            FirebasePaths.d +
            userId
          );
        }
      }

      case FirebasePaths.paths.USER_DELIM: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.USERS +
            FirebasePaths.d +
            userId +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.USERS_ROOT: {
        return (
          FirebasePaths.d + FirebasePaths.folderNames.USERS + FirebasePaths.d
        );
      }

      case FirebasePaths.paths.USER_SEND: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.USERS +
            FirebasePaths.d +
            userId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SEND
          );
        }
      }

      case FirebasePaths.paths.USER_SEND_DELIM: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.USERS +
            FirebasePaths.d +
            userId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SEND +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.USER_RECEIVED: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.USERS +
            FirebasePaths.d +
            userId +
            FirebasePaths.d +
            FirebasePaths.folderNames.RECEIVED
          );
        }
      }

      case FirebasePaths.paths.USER_RECEIVED_DELIM: {
        if (userId === undefined || userId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_USER_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.USERS +
            FirebasePaths.d +
            userId +
            FirebasePaths.d +
            FirebasePaths.folderNames.RECEIVED +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LISTS_DATA_ROOT: {
        return (
          FirebasePaths.d +
          FirebasePaths.folderNames.SHARED +
          FirebasePaths.d +
          FirebasePaths.folderNames.SHOPPING_LISTS
        );
      }

      case FirebasePaths.paths.SHOPPING_LISTS_DATA_ROOT_DELIM: {
        return (
          FirebasePaths.d +
          FirebasePaths.folderNames.SHARED +
          FirebasePaths.d +
          FirebasePaths.folderNames.SHOPPING_LISTS +
          FirebasePaths.d
        );
      }

      case FirebasePaths.paths.SHOPPING_LIST_DATA: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_DATA_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_CARD: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST_CARD
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_CARD_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST_CARD +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_SENDER: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('firebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST_SENDER
          );
        }
      }

      case FirebasePaths.paths.SHOPPING_LIST_RECEIVERS: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('firebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST_RECEIVERS
          );
        }
      }

      case FirebasePaths.paths.PRODUCTS_LIST: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST +
            FirebasePaths.d +
            FirebasePaths.folderNames.PRODUCTS_LIST
          );
        }
      }

      case FirebasePaths.paths.PRODUCTS_LIST_DELIM: {
        if (shoppingListId === undefined || shoppingListId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_SHOPPING_LIST_ID');
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST +
            FirebasePaths.d +
            FirebasePaths.folderNames.PRODUCTS_LIST +
            FirebasePaths.d
          );
        }
      }

      case FirebasePaths.paths.PRODUCT: {
        if (
          shoppingListId === undefined ||
          shoppingListId.length <= 0 ||
          productId === undefined ||
          productId.length <= 0
        ) {
          console.log(
            'FirebasePaths->getPath() => BAD_SHOPPING_LIST_OR_PRODUCT_ID',
          );
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST +
            FirebasePaths.d +
            FirebasePaths.folderNames.PRODUCTS_LIST +
            FirebasePaths.d +
            productId
          );
        }
      }

      case FirebasePaths.paths.PRODUCT_DELIM: {
        if (
          shoppingListId === undefined ||
          shoppingListId.length <= 0 ||
          productId === undefined ||
          productId.length <= 0
        ) {
          console.log(
            'FirebasePaths->getPath() => BAD_SHOPPING_LIST_OR_PRODUCT_ID',
          );
          return '';
        } else {
          return (
            FirebasePaths.d +
            FirebasePaths.folderNames.SHARED +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LISTS +
            FirebasePaths.d +
            shoppingListId +
            FirebasePaths.d +
            FirebasePaths.folderNames.SHOPPING_LIST +
            FirebasePaths.d +
            FirebasePaths.folderNames.PRODUCTS_LIST +
            FirebasePaths.d +
            productId +
            FirebasePaths.d
          );
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
  USER: 'USER',
  USER_DELIM: 'USER_DELIM',
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
  SHOPPING_LIST_SENDER: 'SHOPPING_LIST_SENDER',
  SHOPPING_LIST_RECEIVERS: 'SHOPPING_LIST_RECEIVERS',
  SHOPPING_LIST: 'SHOPPING_LIST',
  SHOPPING_LIST_DELIM: 'SHOPPING_LIST_DELIM',
  PRODUCTS_LIST: 'PRODUCTS_LIST',
  PRODUCTS_LIST_DELIM: 'PRODUCTS_LIST_DELIM',
  PRODUCT: 'PRODUCT',
  PRODUCT_DELIM: 'PRODUCT_DELIM',
};
FirebasePaths.folderNames = {
  USERS: 'users',
  SEND: 'send',
  RECEIVED: 'received',
  SHARED: 'shared',
  SHOPPING_LISTS: 'shoppingLists',
  SHOPPING_LIST: 'shoppingList',
  SHOPPING_LIST_CARD: 'shoppingListCard',
  PRODUCTS_LIST: 'productsList',
  COMPLETED_ITEMS_COUNT: 'completedItemsCount',
  COMPLETION_STATUS: 'completionStatus',
  TOTAL_ITEMS_COUNT: 'totalItemsCount',
  UPDATE_TIMESTAMP: 'updateTimestamp',
  CLASSES: 'classes',
  UNITS: 'units',
  SHOPPING_LIST_SENDER: 'sender',
  SHOPPING_LIST_RECEIVERS: 'receivers',
};
FirebasePaths.d = '/';
