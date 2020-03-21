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
    // console.log('REMOVE_LISTENERS');

    FirebaseStorage.pathHandlersMap.forEach((handler, path) => {
      path.off('value', handler);
    });

    FirebaseStorage.pathHandlersMap.clear();
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

  static async getShoppingList(shoppingListId) {
    console.log('FirebaseStorage->getShoppingList()');

    const path = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST,
      shoppingListId,
    });

    console.log(path);

    // if (FirebaseStorage.sendSharedShoppingLists.has(shoppingListId)) {
    //   return FirebaseStorage.sendSharedShoppingLists.get(shoppingListId)
    //     .shoppingList;
    // } else if (
    //   FirebaseStorage.receivedSharedShoppingLists.get(shoppingListId)
    // ) {
    //   let listData = FirebaseStorage.receivedSharedShoppingLists.get(
    //     shoppingListId,
    //   );
    //
    //   if (!listData.touched) {
    //     listData.touched = true;
    //     FirebaseStorage.receivedSharedShoppingLists.set(
    //       shoppingListId,
    //       listData,
    //     );
    //
    //     let receivedPath = FirebasePaths.getPath({
    //       pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
    //       // pathId: FirebaseStorage.localSignInInfo.phone,
    //       userId: FirebaseStorage.localSignInInfo.phone,
    //     });
    //
    //     database()
    //       .ref(receivedPath)
    //       .child(shoppingListId)
    //       .update({touched: true});
    //   }
    //
    //   return listData.shoppingList;
    // } else {
    //   console.log(
    //     'FirebaseStorage->getShoppingList: BAD_SHOPPING_LIST_ID: ' +
    //       shoppingListId,
    //   );
    //
    //   return undefined;
    // }
  }

  // static async getShoppingList(shoppingListId) {
  //   if (FirebaseStorage.sendSharedShoppingLists.has(shoppingListId)) {
  //     return FirebaseStorage.sendSharedShoppingLists.get(shoppingListId)
  //       .shoppingList;
  //   } else if (
  //     FirebaseStorage.receivedSharedShoppingLists.get(shoppingListId)
  //   ) {
  //     let listData = FirebaseStorage.receivedSharedShoppingLists.get(
  //       shoppingListId,
  //     );
  //
  //     if (!listData.touched) {
  //       listData.touched = true;
  //       FirebaseStorage.receivedSharedShoppingLists.set(
  //         shoppingListId,
  //         listData,
  //       );
  //
  //       let receivedPath = FirebasePaths.getPath({
  //         pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
  //         // pathId: FirebaseStorage.localSignInInfo.phone,
  //         userId: FirebaseStorage.localSignInInfo.phone,
  //       });
  //
  //       database()
  //         .ref(receivedPath)
  //         .child(shoppingListId)
  //         .update({touched: true});
  //     }
  //
  //     return listData.shoppingList;
  //   } else {
  //     console.log(
  //       'FirebaseStorage->getShoppingList: BAD_SHOPPING_LIST_ID: ' +
  //         shoppingListId,
  //     );
  //
  //     return undefined;
  //   }
  // }

  static async removeShoppingList(shoppingListId) {
    console.log('REMOVE_SHARED_SHOPPING_LIST: ' + shoppingListId);

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
    console.log('SET_PRODUCT_STATUS: ' + shoppingListId);

    if (status !== PRODUCT_COMPLETED && status !== PRODUCT_NOT_COMPLETED) {
      console.log(
        'FirebaseStorage->setShoppingListItemStatus(): BAD_STATUS: ' + status,
      );
      return;
    }

    let shoppingListData;
    if (FirebaseStorage.receivedSharedShoppingLists.has(shoppingListId)) {
      shoppingListData = FirebaseStorage.receivedSharedShoppingLists.get(
        shoppingListId,
      );
    } else if (FirebaseStorage.sendSharedShoppingLists.has(shoppingListId)) {
      shoppingListData = FirebaseStorage.sendSharedShoppingLists.get(
        shoppingListId,
      );
    } else {
      console.log(
        'FirebaseStorage->setProductStatus(): BAD_SHOPPING_LIST_ID: ' +
          shoppingListId,
      );
      return;
    }

    let {shoppingList} = shoppingListData;
    let {productsList} = shoppingList;

    let productData = productsList.filter(product => product.id === productId);
    if (!productData.length) {
      console.log(
        'FirebaseStorage->setProductStatus()=>UNABLE_TO_FIND_PRODUCT_WITH_ID: ' +
          productId,
      );
      return;
    }

    let product = productData[0];
    product.completionStatus = status;

    let completedItemsCount = 0;
    productsList.forEach(p => {
      if (p.completionStatus === PRODUCT_COMPLETED) {
        ++completedItemsCount;
      }
    });

    shoppingList.updateTimestamp = Date.now();
    shoppingList.totalItemsCount = productsList.length;
    shoppingList.completedItemsCount = completedItemsCount;

    FirebaseStorage.notifier.notify({
      event: FirebaseStorage.events.SHARED_PRODUCT_UPDATED,
      data: {shoppingListId, productId, status},
    });

    let shoppingListSharedPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_DATA,
      shoppingListId,
      // pathId: shoppingListId,
    });

    console.log('PATH: ' + shoppingListSharedPath);

    // let updates = {};
    // updates[shoppingListSharedPath + '/shoppingList/'] = {
    //   updateTimestamp: shoppingList.updateTimestamp,
    //   completedItemsCount: shoppingList.completedItemsCount,
    //   productsList: productsList,
    // };

    database()
      .ref(shoppingListSharedPath)
      .child('shoppingList')
      .child('productsList')
      .push({
        // updateTimestamp: shoppingList.updateTimestamp,
        // completedItemsCount: shoppingList.completedItemsCount,
        productsList,
      });

    // if (!listData.touched) {
    //   listData.touched = true;
    //   FirebaseStorage.receivedSharedShoppingLists.set(
    //     shoppingListId,
    //     listData,
    //   );
    //
    //   let receivedPath = FirebasePaths.getPath({
    //     pathType: USER_RECEIVED_DELIM,
    //     pathId: FirebaseStorage.localSignInInfo.phone,
    //   });
    //
    //   database()
    //     .ref(receivedPath)
    //     .child(shoppingListId)
    //     .update({touched: true});
    // }
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

// export class FirebaseStorage {
//   static async init(localSignInInfo) {
//     console.log('FIREBASE_STORAGE_INIT');
//
//
//     const pathsMap = new Map();
//     pathsMap.set('send', undefined);
//     pathsMap.set('received', undefined);
//
//
//     this.createHandlers();
//
//     FirebaseStorage.handlersMap = new Map();
//
//     FirebaseStorage.localSignInInfo = localSignInInfo;
//     await this.handleFirebaseListeners();
//
//     StorageEvents.subscribe({
//       event: SIGN_IN_INFO_CHANGED,
//       handler: async signInInfo => {
//         FirebaseStorage.localSignInInfo = signInInfo;
//         await this.handleFirebaseListeners();
//       },
//     });
//   }
//
//   static createHandlers() {
//     const sendPathHandler = snapshot => {
//       console.log('sendPathHandler()');
//     };
//
//     const receivedPathHandler = snapshot => {
//       console.log('receivedPathHandler()');
//     };
//
//     const listChangedHandler = snapshot => {
//       console.log('listChangedHandler()');
//     };
//
//     FirebaseStorage.handlers = {
//       sendPathHandler,
//       receivedPathHandler,
//       listChangedHandler,
//     };
//   }
//
//   static async handleFirebaseListeners() {
//     const {phone} = FirebaseStorage.localSignInInfo;
//     if (!phone) {
//       this.removeListeners();
//     } else {
//       this.setListeners();
//     }
//   }
//
//   static async setListeners() {
//     console.log('SET_LISTENERS');
//
//     const {phone} = FirebaseStorage.localSignInInfo;
//     if (!phone) {
//       console.log('NO_PHONE');
//       return;
//     }
//
//     this.removeListeners();
//
//     FirebaseStorage.sendShoppingListsPathChangeHandler = snapshot => {
//       // console.log('SEND: ' + JSON.stringify(snapshot.val()));
//
//       snapshot.forEach(async child => {
//         // console.log('VALUE: ' + child.key + ' - ' + JSON.stringify(child.val()));
//
//         const shoppingListKey = child.key;
//         const shoppingListPath = database().ref(
//           '/shared/shoppingLists/' + shoppingListKey,
//         );
//
//         const shoppingListData = await shoppingListPath.once('value');
//         const {shoppingList, units, classes} = FirebaseConverter.listFromFirebase(
//           shoppingListData,
//         );
//       });
//     };
//     FirebaseStorage.receivedShoppingListsPathChangeHandler = snapshot => {
//       console.log('RECEIVED: ' + JSON.stringify(snapshot.val()));
//     };
//
//     FirebaseStorage.sendShoppingListsPath = database().ref(
//       '/users/' + phone + '/send',
//     );
//     FirebaseStorage.receivedShoppingListsPath = database().ref(
//       '/users/' + phone + '/received',
//     );
//
//     FirebaseStorage.sendShoppingListsPath.on(
//       'value',
//       FirebaseStorage.sendShoppingListsPathChangeHandler,
//     );
//     FirebaseStorage.receivedShoppingListsPath.on(
//       'value',
//       FirebaseStorage.receivedShoppingListsPathChangeHandler,
//     );
//   }
//
//   static removeListeners() {
//     console.log('REMOVE_LISTENERS');
//
//     if (
//       FirebaseStorage.sendShoppingListsPath &&
//       FirebaseStorage.sendShoppingListsPathChangeHandler
//     ) {
//       FirebaseStorage.sendShoppingListsPath.off(
//         'value',
//         FirebaseStorage.sendShoppingListsPathChangeHandler,
//       );
//     }
//
//     if (
//       FirebaseStorage.receivedShoppingListsPath &&
//       FirebaseStorage.receivedShoppingListsPathChangeHandler
//     ) {
//       FirebaseStorage.receivedShoppingListsPath.off(
//         'value',
//         FirebaseStorage.receivedShoppingListsPathChangeHandler,
//       );
//     }
//   }
//
//   // static fromFirebase(shoppingListSnapshot) {
//   //   console.log('fromFirebase()');
//   //
//   //   // const shoppingListData = shoppingListSnapshot.val().shoppingList;
//   //   //
//   //   // const id = shoppingListSnapshot.key;
//   //   // const name = shoppingListData.name;
//   //   //
//   //   // const productsList = [];
//   //   // shoppingListData.productsList.forEach(product => {
//   //   //   console.log('PRODUCT: ' + JSON.stringify(product));
//   //   // });
//   // }
//
//   static off() {
//     console.log('FIREBASE_STORAGE_OFF');
//     this.removeListeners();
//   }
// }
//
// FirebaseStorage.localSignInInfo = {};
// FirebaseStorage.sendShoppingListsPath = undefined;
// FirebaseStorage.receivedShoppingListsPath = undefined;
// FirebaseStorage.sendShoppingListsPathChangeHandler = undefined;
// FirebaseStorage.receivedShoppingListsPathChangeHandler = undefined;
// FirebaseStorage.handlersMap = undefined;
// FirebaseStorage.handlers = undefined;
