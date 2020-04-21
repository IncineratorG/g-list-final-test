import {AuthenticationStorageTable} from './tables-description/AuthenticationStorageTable';
import {AuthenticationStorageOperations} from './operations-implementation/AuthenticationStorageOperations';
import {StorageNotifier} from '../../common-data/storage-notifier/StorageNotifier';

const DB_NAME = 'glist-auth.db';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class AuthenticationStorage {
  static subscribe({entityIds, event, handler}) {
    return AuthenticationStorage.notifier.subscribe({
      entityIds,
      event,
      handler,
    });
  }

  static init() {
    const createAuthenticationTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE +
      ' (' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_PHONE +
      ' TEXT, ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_EMAIL +
      ' TEXT, ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_PASSWORD +
      ' TEXT)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(createAuthenticationTableStatement, [], resolve);
      });
    });
  }

  static isInitialized() {
    return AuthenticationStorageOperations.isInitialized(db);
  }

  static async getLocalSignInInfo() {
    const localSignInInfo = await AuthenticationStorageOperations.getSignInInfo(
      db,
    );

    return {
      phone:
        localSignInInfo.length > 0 ? localSignInInfo.item(0).phone : undefined,
      email:
        localSignInInfo.length > 0 ? localSignInInfo.item(0).email : undefined,
      password:
        localSignInInfo.length > 0
          ? localSignInInfo.item(0).password
          : undefined,
    };
  }

  static async updateLocalSignInInfo({phone, email, password}) {
    const currentSignInInfoData = await AuthenticationStorageOperations.getSignInInfo(
      db,
    );

    if (currentSignInInfoData.length > 0) {
      await AuthenticationStorageOperations.removeSignInInfo(db);
    }

    await AuthenticationStorageOperations.createSignInInfo(
      db,
      phone,
      email,
      password,
    );

    const localSignInInfo = await this.getLocalSignInInfo();

    AuthenticationStorage.notifier.notify({
      event: AuthenticationStorage.events.LOCAL_SIGN_IN_INFO_UPDATED,
      data: {localSignInInfo},
    });
  }

  static async removeLocalSignInInfo() {
    await AuthenticationStorageOperations.removeSignInInfo(db);
    const localSignInInfo = await this.getLocalSignInInfo();

    AuthenticationStorage.notifier.notify({
      event: AuthenticationStorage.events.LOCAL_SIGN_IN_INFO_REMOVED,
      data: {localSignInInfo},
    });
  }
}

AuthenticationStorage.events = {
  LOCAL_SIGN_IN_INFO_UPDATED: 'LOCAL_SIGN_IN_INFO_UPDATED',
  LOCAL_SIGN_IN_INFO_REMOVED: 'LOCAL_SIGN_IN_INFO_REMOVED',
};
AuthenticationStorage.notifier = new StorageNotifier({});
