import {
  AsyncStorageImpl,
  ListOfShoppingList,
  ShoppingList,
} from './async-storage/AsyncStorageImpl';
import {SqliteStorageImpl_V2} from './sqlite-storage/SqliteStorageImpl_V2';

export class Storage {
  static init() {
    return SqliteStorageImpl_V2.init();
  }

  static getAllShoppingLists() {
    return SqliteStorageImpl_V2.getShoppingLists();
  }

  static getListOfShoppingLists() {
    const uuid = require('uuid/v1');
    AsyncStorageImpl.get({type: ListOfShoppingList, uuid: uuid()});
  }

  static createShoppingList() {
    const object = {name: 'MyName', age: 23};
    return AsyncStorageImpl.add({type: ShoppingList, object: object});
  }

  static getShoppingList(id) {
    return AsyncStorageImpl.get({type: ShoppingList, id: id});
  }
}
