import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';

export const checkUserHandler = async ({email}) => {
  if (!email || email.length <= 0) {
    return FirebaseResponse.type.ERROR;
  }

  const userId = IdManager.getId(email);

  const userPath = FirebasePaths.getPath({
    pathType: FirebasePaths.paths.USER,
    userId: userId,
  });

  const snapshot = await database()
    .ref(userPath)
    .once('value');

  if (snapshot.exists()) {
    return FirebaseResponse.type.EXIST;
  } else {
    return FirebaseResponse.type.NOT_EXIST;
  }
};
