import database from '@react-native-firebase/database';
import {
  receivedPathHandler,
  sendPathHandler,
  sharedListChangedHandler,
} from './firebaseHandlers';
import {FirebasePaths} from './FirebasePaths';
import {StorageNotifier} from '../../common-data/storage-notifier/StorageNotifier';
import {PRODUCT_COMPLETED, PRODUCT_NOT_COMPLETED} from '../data/productStatus';
import {IdManager} from './id-manager/IdManager';
import {Authentication} from '../../authentication/Authentication';
import {
  getShoppingListOnce,
  getShoppingListPended,
} from '../helpers/firebaseStorageHelper';

export class FirebaseStorage {
  static subscribe({entityIds, event, handler}) {
    return FirebaseStorage.notifier.subscribe({entityIds, event, handler});
  }

  static async init() {
    FirebaseStorage.handlers.set('sendPath', sendPathHandler);
    FirebaseStorage.handlers.set('receivedPath', receivedPathHandler);
    FirebaseStorage.handlers.set('sharedListChanged', sharedListChangedHandler);

    await this.updateSubscriptions();
    this.updateListeners();
  }

  static updateListeners() {
    const {email} = FirebaseStorage.localSignInInfo;
    if (email) {
      this.setListeners();
    } else {
      this.removeListenersAndClearCachedLists();
    }
  }

  static async updateSubscriptions() {
    // console.log('LENGTH: ' + FirebaseStorage.localSubscrtiptions.length);
    if (FirebaseStorage.localSubscrtiptions.length > 0) {
      await this.removeSubscriptions();
      await this.setSubscriptions();
    }

    await this.setSubscriptions();
  }

  static setListeners() {
    this.removeListenersAndClearCachedLists();

    const sendPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_SEND,
      userId: IdManager.getFirebaseId(FirebaseStorage.localSignInInfo),
    });
    const receivedPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_RECEIVED,
      userId: IdManager.getFirebaseId(FirebaseStorage.localSignInInfo),
    });

    const sendPathRef = database().ref(sendPath);
    const receivedPathRef = database().ref(receivedPath);

    sendPathRef.on('value', FirebaseStorage.handlers.get('sendPath'));
    receivedPathRef.on('value', FirebaseStorage.handlers.get('receivedPath'));

    FirebaseStorage.pathHandlersMap.set(
      sendPathRef,
      FirebaseStorage.handlers.get('sendPath'),
    );
    FirebaseStorage.pathHandlersMap.set(
      receivedPathRef,
      FirebaseStorage.handlers.get('receivedPath'),
    );
  }

  static removeListenersAndClearCachedLists() {
    FirebaseStorage.pathHandlersMap.forEach((handler, path) => {
      path.off('value', handler);
    });
    FirebaseStorage.pathHandlersMap.clear();

    if (FirebaseStorage.shoppingListPathHandler.path) {
      FirebaseStorage.shoppingListPathHandler.path.off(
        'value',
        FirebaseStorage.shoppingListPathHandler.handler,
      );
    }

    FirebaseStorage.sendSharedShoppingLists.clear();
    FirebaseStorage.sendSharedShoppingListsIds.clear();
    FirebaseStorage.receivedSharedShoppingLists.clear();
    FirebaseStorage.receivedSharedShoppingListsIds.clear();

    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
    });
  }

  static off() {
    console.log('FIREBASE_STORAGE_OFF');
    this.removeListenersAndClearCachedLists();
    this.removeSubscriptions();
  }

  static async getShoppingLists() {
    const shoppingLists = [];
    FirebaseStorage.sendSharedShoppingLists.forEach((listData, listId) => {
      let {shoppingListCard} = listData;
      shoppingLists.push(shoppingListCard);
    });
    FirebaseStorage.receivedSharedShoppingLists.forEach((listData, listId) => {
      let {shoppingListCard} = listData;
      shoppingListCard.touched = listData.touched;
      shoppingLists.push(shoppingListCard);
    });

    return shoppingLists;
  }

  static async getShoppingList(shoppingListId, once) {
    if (once) {
      return await getShoppingListOnce(shoppingListId, this);
    } else {
      return await getShoppingListPended(shoppingListId, this);
    }
  }

  static async removeShoppingList(shoppingListId) {
    if (FirebaseStorage.sendSharedShoppingLists.has(shoppingListId)) {
      FirebaseStorage.sendSharedShoppingLists.delete(shoppingListId);
      FirebaseStorage.sendSharedShoppingListsIds.delete(shoppingListId);

      FirebaseStorage.notifier.notify({
        event: FirebaseStorage.events.SHARED_SEND_LISTS_CHANGED,
      });

      return true;
    }

    return false;
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
    status,
  }) {
    // Получаем данные списка покупок.
    const listData = FirebaseStorage.sendSharedShoppingLists.get(
      shoppingListId,
    );
    if (!listData) {
      console.log(
        'FirebaseStorage->addShoppingListItem(): UNABLE_TO_FIND_SEND_LIST_DATA_WITH_ID: ' +
          shoppingListId,
      );
      return;
    }

    // Получаем текущее время и статус нового продукта.
    const currentDate = Date.now();
    const completionStatus = PRODUCT_NOT_COMPLETED;

    // Получаем путь в firebase до списка продуктов.
    const productsListPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.PRODUCTS_LIST,
      shoppingListId,
    });

    // Получаем ID нового продукта.
    const productKey = database()
      .ref(productsListPath)
      .push().key;

    // Получаем список покупок и карточку списка покупок.
    const {shoppingList, shoppingListCard} = listData;

    // Добавляем продукт в локальный список покупок.
    const newProduct = {
      id: productKey,
      parentId: shoppingListId,
      name: name,
      unitId: unitId,
      quantity: quantity,
      classId: classId,
      note: note,
      completionStatus: completionStatus,
      createTimestamp: currentDate,
      updateTimestamp: currentDate,
    };
    shoppingList.productsList.push(newProduct);

    // Устанавливаем статистические параметры спсика и карточки списка.
    let completedItemsCount = 0;
    shoppingList.productsList.forEach(p => {
      if (p.completionStatus === PRODUCT_COMPLETED) {
        ++completedItemsCount;
      }
    });
    const totalItemsCount = shoppingList.productsList.length;

    shoppingList.completedItemsCount = completedItemsCount;
    shoppingList.totalItemsCount = totalItemsCount;
    shoppingList.updateTimestamp = currentDate;

    shoppingListCard.completedItemsCount = completedItemsCount;
    shoppingListCard.totalItemsCount = totalItemsCount;
    shoppingListCard.updateTimestamp = currentDate;

    // Уведомляем обновлённым списком покупок всех слушателей текущего списка.
    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCTS_ADDED,
      data: {shoppingListId, products: [newProduct]},
    });

    return {completedItemsCount, totalItemsCount, product: newProduct};
  }

  static async setProductStatus({shoppingListId, productId, status}) {
    if (status !== PRODUCT_COMPLETED && status !== PRODUCT_NOT_COMPLETED) {
      console.log(
        'FirebaseStorage->setShoppingListItemStatus(): BAD_STATUS: ' + status,
      );
      return;
    }

    // Получаем данные списка покупок.
    const listData = FirebaseStorage.sendSharedShoppingLists.has(shoppingListId)
      ? FirebaseStorage.sendSharedShoppingLists.get(shoppingListId)
      : FirebaseStorage.receivedSharedShoppingLists.get(shoppingListId);

    // Получаем соответсвующий продукт.
    const {shoppingList, shoppingListCard} = listData;
    const {productsList} = shoppingList;
    const productData = productsList.filter(
      product => product.id === productId,
    );
    if (!productData.length) {
      console.log(
        'FirebaseStorage->setProductStatus()=>UNABLE_TO_FIND_PRODUCT_WITH_ID: ' +
          productId,
      );
      return;
    }

    // Устанавливаем у продукта соответсвтующий сттатус
    const product = productData[0];
    product.completionStatus = status;

    // Устанавливаем статистические параметры спсика и карточки списка.
    let completedItemsCount = 0;
    productsList.forEach(p => {
      if (p.completionStatus === PRODUCT_COMPLETED) {
        ++completedItemsCount;
      }
    });
    const totalItemsCount = productsList.length;
    const updateTimestamp = Date.now();

    shoppingList.completedItemsCount = completedItemsCount;
    shoppingList.totalItemsCount = totalItemsCount;
    shoppingList.updateTimestamp = updateTimestamp;

    shoppingListCard.completedItemsCount = completedItemsCount;
    shoppingListCard.totalItemsCount = totalItemsCount;
    shoppingListCard.updateTimestamp = updateTimestamp;

    // FirebaseStorage.notifier.notify({
    //   event: FirebaseStorage.events.SHARED_PRODUCTS_UPDATED,
    //   data: {shoppingListId, products: [product]},
    // });
    // // Уведомляем обновлённым списком покупок всех слушателей текущего списка.
    // FirebaseStorage.notifier.notify({
    //   event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
    //   data: shoppingList,
    // });

    return {completedItemsCount, totalItemsCount};
  }

  static async removeProduct({shoppingListId, productId}) {
    // Получаем данные списка покупок.
    let listData = FirebaseStorage.sendSharedShoppingLists.get(shoppingListId);
    if (!listData) {
      console.log(
        'FirebaseStorage->removeProduct(): UNABLE_TO_FIND_SEND_LIST_DATA_WITH_ID: ' +
          shoppingListId,
      );
      return;
    }

    // Получаем список покупок и карточку списка покупок.
    let {shoppingList, shoppingListCard} = listData;

    // Удаляем продукт из списка.
    let removedProduct;
    shoppingList.productsList = shoppingList.productsList.filter(product => {
      if (product.id === productId) {
        removedProduct = product;
        return false;
      } else {
        return true;
      }
    });

    // Устанавливаем статистические параметры спсика и карточки списка.
    let completedItemsCount = 0;
    shoppingList.productsList.forEach(p => {
      if (p.completionStatus === PRODUCT_COMPLETED) {
        ++completedItemsCount;
      }
    });
    const totalItemsCount = shoppingList.productsList.length;
    const updateTimestamp = Date.now();

    shoppingList.completedItemsCount = completedItemsCount;
    shoppingList.totalItemsCount = totalItemsCount;
    shoppingList.updateTimestamp = updateTimestamp;

    shoppingListCard.completedItemsCount = completedItemsCount;
    shoppingListCard.totalItemsCount = totalItemsCount;
    shoppingListCard.updateTimestamp = updateTimestamp;

    FirebaseStorage.sendSharedShoppingLists.set(shoppingListId, {
      ...listData,
      shoppingList,
      shoppingListCard,
    });

    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCTS_DELETED,
      data: {shoppingListId, products: [removedProduct]},
    });
    // // Уведомляем обновлённым списком покупок всех слушателей текущего списка.
    // FirebaseStorage.notifier.notify({
    //   event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
    //   data: shoppingList,
    // });

    return {completedItemsCount, totalItemsCount};
  }

  static async getUnits({shoppingListId}) {
    console.log('GET_UNITS');
  }

  static async getClasses({shoppingListId}) {
    console.log('GET_CLASSES');
  }

  static async setSubscriptions() {
    const subscriptionData = await Authentication.subscribe({
      event: Authentication.events.SIGN_IN_INFO_CHANGED,
      handler: signInInfo => {
        FirebaseStorage.localSignInInfo = signInInfo;
        this.updateListeners();
      },
    });

    FirebaseStorage.localSubscrtiptions.push(subscriptionData.unsubscribe);
    FirebaseStorage.localSignInInfo = subscriptionData.data;
  }

  static removeSubscriptions() {
    console.log('removeSubscriptions()');

    FirebaseStorage.localSubscrtiptions.forEach(unsubscribeFunc => {
      unsubscribeFunc();
    });
    FirebaseStorage.localSubscrtiptions.length = 0;
  }
}

FirebaseStorage.localSignInInfo = undefined;
FirebaseStorage.handlers = new Map();
FirebaseStorage.pathHandlersMap = new Map();

FirebaseStorage.shoppingListPathHandler = {path: undefined, handler: undefined};

FirebaseStorage.sendSharedShoppingLists = new Map();
FirebaseStorage.sendSharedShoppingListsIds = new Set();
FirebaseStorage.receivedSharedShoppingLists = new Map();
FirebaseStorage.receivedSharedShoppingListsIds = new Set();

FirebaseStorage.notifier = new StorageNotifier({});
FirebaseStorage.events = {
  SHARED_SEND_LISTS_CHANGED: 'SHARED_SEND_LISTS_CHANGED',
  SHARED_SEND_LISTS_LOADING: 'SHARED_SEND_LISTS_LOADING',
  SHARED_SEND_LISTS_LOADED: 'SHARED_SEND_LISTS_LOADED',

  SHARED_RECEIVED_LISTS_CHANGED: 'SHARED_RECEIVED_LISTS_CHANGED',
  SHARED_RECEIVED_LISTS_LOADING: 'SHARED_RECEIVED_LISTS_LOADING',
  SHARED_RECEIVED_LISTS_LOADED: 'SHARED_RECEIVED_LISTS_LOADED',

  // SHARED_PRODUCT_UPDATED: 'SHARED_PRODUCT_UPDATED',

  SHARED_PRODUCTS_UPDATED: 'SHARED_PRODUCTS_UPDATED',
  SHARED_PRODUCTS_ADDED: 'SHARED_PRODUCTS_ADDED',
  SHARED_PRODUCTS_DELETED: 'SHARED_PRODUCTS_DELETED',

  SHARED_LIST_LOADING: 'SHARED_LIST_LOADING',
  SHARED_LIST_LOADED: 'SHARED_LIST_LOADED',
};
FirebaseStorage.localSubscrtiptions = [];
