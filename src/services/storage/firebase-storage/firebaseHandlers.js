import database from '@react-native-firebase/database';
import {FirebasePaths} from './FirebasePaths';
import {SHARED_SHOPPING_LIST} from './firebasePathTypes';
import {FirebaseConverter} from './list-converter/FirebaseConverter';
import {StorageEvents} from '../StorageEvents';
import {SHARED_LIST_ADDED} from '../storageEventTypes';

export const sendPathHandler = snapshot => {
  if (snapshot.val() === null) {
    console.log('SEND_PATH_HANDLER: VAL_IS_NULL');
    return;
  }

  // async function printFiles () {
  //   const files = await getFilePaths();
  //
  //   await Promise.all(files.map(async (file) => {
  //     const contents = await fs.readFile(file, 'utf8')
  //     console.log(contents)
  //   }));
  // }

  // snapshot.forEach(async child => {
  //   const sharedShoppingListId = child.key;
  //   const sharedShoppingListPath = database().ref(
  //     FirebasePaths.getPath({
  //       pathType: SHARED_SHOPPING_LIST,
  //       pathId: sharedShoppingListId,
  //     }),
  //   );
  //
  //   const sharedShoppingListSnapshot = await sharedShoppingListPath.once(
  //     'value',
  //   );
  //   const sharedShoppingListData = FirebaseConverter.listFromFirebase(
  //     sharedShoppingListSnapshot,
  //   );
  //
  //   StorageEvents.fireEvent({
  //     event: SHARED_LIST_ADDED,
  //     data: sharedShoppingListData,
  //   });
  // });
};

export const receivedPathHandler = snapshot => {
  if (snapshot.val() === null) {
    console.log('RECEIVED_PATH_HANDLER: VAL_IS_NULL');
    return;
  }

  console.log('RECEIVED_PATH_HANDLER: ' + JSON.stringify(snapshot.val()));
};

export const sharedListChangedHandler = () => {
  console.log('SHARED_LIST_CHANGED_HANDLER');
};
