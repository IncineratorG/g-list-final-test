import database from '@react-native-firebase/database';
import {
  receivedPathHandler,
  sendPathHandler,
  sharedListChangedHandler,
} from './firebaseHandlers';
import {FirebasePaths} from './FirebasePaths';
import {Storage} from '../Storage';
import {StorageNotifier} from '../storage-notifier/StorageNotifier';
import {PRODUCT_COMPLETED, PRODUCT_NOT_COMPLETED} from '../data/productStatus';

export class FirebaseStorage {
  static subscribe({entityIds, event, handler}) {
    return FirebaseStorage.notifier.subscribe({entityIds, event, handler});
  }

  static async init(localSignInInfo) {
    FirebaseStorage.localSignInInfo = localSignInInfo;

    FirebaseStorage.handlers.set('sendPath', sendPathHandler);
    FirebaseStorage.handlers.set('receivedPath', receivedPathHandler);
    FirebaseStorage.handlers.set('sharedListChanged', sharedListChangedHandler);

    await this.updateSubscriptions();
    this.updateListeners();
  }

  static updateListeners() {
    const {phone} = FirebaseStorage.localSignInInfo;
    if (phone) {
      this.setListeners();
    } else {
      this.removeListeners();
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
    this.removeListeners();

    const {phone} = FirebaseStorage.localSignInInfo;

    const sendPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_SEND,
      userId: phone,
    });
    const receivedPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.USER_RECEIVED,
      userId: phone,
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

  static removeListeners() {
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
  }

  static off() {
    console.log('FIREBASE_STORAGE_OFF');
    this.removeListeners();
    this.removeSubscriptions();
  }

  static async getShoppingLists() {
    const shoppingLists = [];
    FirebaseStorage.sendSharedShoppingLists.forEach((listData, listId) => {
      let {shoppingList} = listData;
      shoppingLists.push(shoppingList);
    });
    FirebaseStorage.receivedSharedShoppingLists.forEach((listData, listId) => {
      let {shoppingList} = listData;
      shoppingList.touched = listData.touched;
      shoppingLists.push(shoppingList);
    });

    return shoppingLists;
  }

  static async getShoppingList(shoppingListId, once) {
    // Получаем данные соответсвующего списка покупок.
    const listData = FirebaseStorage.sendSharedShoppingLists.has(shoppingListId)
      ? FirebaseStorage.sendSharedShoppingLists.get(shoppingListId)
      : FirebaseStorage.receivedSharedShoppingLists.get(shoppingListId);

    // Уведомляем списком покупок из запрошенных данных всех слушателей текущего списка.
    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
      data: listData.shoppingList,
    });

    // Если на кокой-либо список покупок в firebase установлен слушатель - снимаем его.
    if (FirebaseStorage.shoppingListPathHandler.path) {
      FirebaseStorage.shoppingListPathHandler.path.off(
        'value',
        FirebaseStorage.shoppingListPathHandler.handler,
      );
    }

    // Получаем путь до соответвующего списка покупок.
    const shoppingListPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST,
      shoppingListId,
    });

    // Устанавливаем слушатель на соответсвующий список покупок в firebase.
    const shoppingListPathRef = database().ref(shoppingListPath);
    shoppingListPathRef.on(
      'value',
      FirebaseStorage.handlers.get('sharedListChanged'),
    );

    FirebaseStorage.shoppingListPathHandler.path = shoppingListPathRef;
    FirebaseStorage.shoppingListPathHandler.handler = FirebaseStorage.handlers.get(
      'sharedListChanged',
    );

    // Помечаем список покупок как прочитанный.
    if (
      FirebaseStorage.receivedSharedShoppingLists.has(shoppingListId) &&
      !listData.touched
    ) {
      listData.touched = true;
      FirebaseStorage.receivedSharedShoppingLists.set(shoppingListId, listData);

      const receivedPath = FirebasePaths.getPath({
        pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
        userId: FirebaseStorage.localSignInInfo.phone,
      });

      database()
        .ref(receivedPath)
        .child(shoppingListId)
        .update({touched: true});
    }

    return listData.shoppingList;
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

  static async addShoppingListItem({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
  }) {
    console.log('ADD_SHOPPING_LIST_ITEM: ' + shoppingListId);
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

    // Уведомляем списком покупок из запрошенных данных всех слушателей текущего списка.
    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
      data: shoppingList,
    });

    // Получаем пути в firebase до списка покупок
    const listPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST,
      shoppingListId,
    });
    const listCardPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_CARD,
      shoppingListId,
    });
    const productPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.PRODUCT,
      shoppingListId,
      productId,
    });

    // Обновляем данные по соответвующим путям.
    const updates = {};
    updates[
      listPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.COMPLETED_ITEMS_COUNT
    ] = completedItemsCount;
    updates[
      listPath + FirebasePaths.d + FirebasePaths.folderNames.TOTAL_ITEMS_COUNT
    ] = totalItemsCount;
    updates[
      listPath + FirebasePaths.d + FirebasePaths.folderNames.UPDATE_TIMESTAMP
    ] = updateTimestamp;
    updates[
      listCardPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.COMPLETED_ITEMS_COUNT
    ] = completedItemsCount;
    updates[
      listCardPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.TOTAL_ITEMS_COUNT
    ] = totalItemsCount;
    updates[
      listCardPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.UPDATE_TIMESTAMP
    ] = updateTimestamp;
    updates[
      productPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.COMPLETION_STATUS
    ] = product.completionStatus;
    updates[
      productPath + FirebasePaths.d + FirebasePaths.folderNames.UPDATE_TIMESTAMP
    ] = updateTimestamp;

    database()
      .ref()
      .update(updates);
  }

  static async getUnits({shoppingListId}) {
    console.log('GET_UNITS');
  }

  static async getClasses({shoppingListId}) {
    console.log('GET_CLASSES');
  }

  static async setSubscriptions() {
    const subscriptionData = await Storage.subscribe({
      event: Storage.events.SIGN_IN_INFO_CHANGED,
      handler: signInInfo => {
        FirebaseStorage.localSignInInfo = signInInfo;
        this.updateListeners();
      },
    });
    FirebaseStorage.localSubscrtiptions.push(subscriptionData.unsubscribe);
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
  SHARED_RECEIVED_LISTS_CHANGED: 'SHARED_RECEIVED_LISTS_CHANGED',
  SHARED_PRODUCT_UPDATED: 'SHARED_PRODUCT_UPDATED',
};
FirebaseStorage.localSubscrtiptions = [];
