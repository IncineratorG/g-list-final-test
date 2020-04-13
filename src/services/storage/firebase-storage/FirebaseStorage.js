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
import {IdManager} from './id-manager/IdManager';

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
    const {email} = FirebaseStorage.localSignInInfo;
    if (email) {
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
        userId: IdManager.getFirebaseId(FirebaseStorage.localSignInInfo),
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

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
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
      event: FirebaseStorage.events.SHARED_PRODUCT_ADDED,
      data: shoppingList,
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

    // Уведомляем обновлённым списком покупок всех слушателей текущего списка.
    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
      data: shoppingList,
    });

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
    shoppingList.productsList = shoppingList.productsList.filter(
      product => product.id !== productId,
    );

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

    // Уведомляем обновлённым списком покупок всех слушателей текущего списка.
    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
      data: shoppingList,
    });

    return {completedItemsCount, totalItemsCount};
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
  SHARED_PRODUCT_ADDED: 'SHARED_PRODUCT_ADDED',
};
FirebaseStorage.localSubscrtiptions = [];
