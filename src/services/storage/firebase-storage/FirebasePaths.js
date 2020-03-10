import {
  SHARED_SHOPPING_LIST,
  SHARED_SHOPPING_LIST_DELIM,
  SHARED_SHOPPING_LISTS_ROOT,
  SHARED_SHOPPING_LISTS_ROOT_DELIM,
  USER_RECEIVED,
  USER_RECEIVED_DELIM,
  USER_SEND,
  USER_SEND_DELIM,
  USERS_ROOT,
} from './firebasePathTypes';

export class FirebasePaths {
  static getPath({pathType, pathId}) {
    switch (pathType) {
      case USERS_ROOT: {
        return '/users/';
      }

      case USER_SEND: {
        if (pathId === undefined || pathId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_PATH_ID');
          return '';
        } else {
          return '/users/' + pathId + '/send';
        }
      }

      case USER_SEND_DELIM: {
        if (pathId === undefined || pathId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_PATH_ID');
          return '';
        } else {
          return '/users/' + pathId + '/send/';
        }
      }

      case USER_RECEIVED: {
        if (pathId === undefined || pathId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_PATH_ID');
          return '';
        } else {
          return '/users/' + pathId + '/received';
        }
      }

      case USER_RECEIVED_DELIM: {
        if (pathId === undefined || pathId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_PATH_ID');
          return '';
        } else {
          return '/users/' + pathId + '/received/';
        }
      }

      case SHARED_SHOPPING_LISTS_ROOT: {
        return '/shared/shoppingLists';
      }

      case SHARED_SHOPPING_LISTS_ROOT_DELIM: {
        return '/shared/shoppingLists/';
      }

      case SHARED_SHOPPING_LIST: {
        if (pathId === undefined || pathId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_PATH_ID');
          return '';
        } else {
          return '/shared/shoppingLists/' + pathId;
        }
      }

      case SHARED_SHOPPING_LIST_DELIM: {
        if (pathId === undefined || pathId.length <= 0) {
          console.log('FirebasePaths->getPath() => BAD_PATH_ID');
          return '';
        } else {
          return '/shared/shoppingLists/' + pathId + '/';
        }
      }
    }
  }
}
