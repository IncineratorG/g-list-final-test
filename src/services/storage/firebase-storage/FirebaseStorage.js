import database from '@react-native-firebase/database';
import {StorageEvents} from '../StorageEvents';
import {SIGN_IN_INFO_CHANGED} from '../storageEventTypes';
import {
  receivedPathHandler,
  sendPathHandler,
  sharedListChangedHandler,
} from './firebaseHandlers';
import {FirebasePaths} from './FirebasePaths';
import {USER_RECEIVED, USER_SEND} from './firebasePathTypes';

export class FirebaseStorage {
  static async init(localSignInInfo) {
    FirebaseStorage.localSignInInfo = localSignInInfo;

    FirebaseStorage.handlers.set('sendPath', sendPathHandler);
    FirebaseStorage.handlers.set('receivedPath', receivedPathHandler);
    FirebaseStorage.handlers.set('sharedListChanged', sharedListChangedHandler);

    this.updateListeners();

    StorageEvents.subscribe({
      event: SIGN_IN_INFO_CHANGED,
      handler: async signInInfo => {
        FirebaseStorage.localSignInInfo = signInInfo;
        this.updateListeners();
      },
    });
  }

  static updateListeners() {
    const {phone} = FirebaseStorage.localSignInInfo;
    if (phone) {
      this.setListeners();
    } else {
      this.removeListeners();
    }
  }

  static setListeners() {
    console.log('SET_LISTENERS');
    this.removeListeners();

    const {phone} = FirebaseStorage.localSignInInfo;

    const sendPath = FirebasePaths.getPath({
      pathType: USER_SEND,
      pathId: phone,
    });
    const receivedPath = FirebasePaths.getPath({
      pathType: USER_RECEIVED,
      pathId: phone,
    });

    const sendPathRef = database().ref(sendPath);
    const receivedPathRef = database().ref(receivedPath);

    FirebaseStorage.paths.set(sendPath, sendPathRef);
    FirebaseStorage.paths.set(receivedPath, receivedPathRef);

    sendPathRef.on('value', FirebaseStorage.handlers.get('sendPath'));
    receivedPathRef.on('value', FirebaseStorage.handlers.get('receivedPath'));

    FirebaseStorage.pathHandlerMap.set(
      sendPathRef,
      FirebaseStorage.handlers.get('sendPath'),
    );
    FirebaseStorage.pathHandlerMap.set(
      receivedPathRef,
      FirebaseStorage.handlers.get('receivedPath'),
    );
  }

  static removeListeners() {
    console.log('REMOVE_LISTENERS');

    FirebaseStorage.pathHandlerMap.forEach((value, key) => {
      value.off('value', key);
    });

    FirebaseStorage.paths.clear();
    FirebaseStorage.pathHandlerMap.clear();
  }

  static off() {
    console.log('FIREBASE_STORAGE_OFF');
    this.removeListeners();
  }
}

FirebaseStorage.localSignInInfo = undefined;
FirebaseStorage.handlers = new Map();
FirebaseStorage.paths = new Map();
FirebaseStorage.pathHandlerMap = new Map();

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
