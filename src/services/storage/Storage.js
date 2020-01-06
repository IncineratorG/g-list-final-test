import {
  AsyncStorageImpl,
  ListOfShoppingList,
  ShoppingList,
} from './async-storage/AsyncStorageImpl';

export class Storage {
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
