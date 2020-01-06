import AsyncStorage from '@react-native-community/async-storage';

export const ListOfShoppingList = 'LIST_OF_SHOPPING_LIST';
export const ShoppingList = 'SHOPPING_LIST';

export class AsyncStorageImpl {
  static get({type, id}) {
    console.log('type: ' + type + ', uuid: ' + id);

    return new Promise(async (resolve, reject) => {
      try {
        const object = await AsyncStorage.getItem(type + id);
        resolve(JSON.parse(object));
      } catch (e) {
        console.log('ERROR_GET: ' + e);
        reject('ERROR_GET: ' + e);
      }
    });
  }

  static add({type, object}) {
    console.log('add()');

    const uuidGenerator = require('uuid/v1');
    const uuid = uuidGenerator();

    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem(type + uuid, JSON.stringify(object));
      } catch (e) {
        console.log('ERROR_ADD: ' + e);
        reject('ERROR_ADD: ' + e);
      }

      resolve(uuid);
    });
  }
}
