import {AuthenticationStorageTable} from '../tables-description/AuthenticationStorageTable';

export class AuthenticationStorageOperations {
  static isInitialized(db) {
    const isInitializedStatement =
      "SELECT name FROM sqlite_master WHERE type='table' AND name='" +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE +
      "'";

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          isInitializedStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getSignInInfo(db) {
    const getSignInInfoStatement =
      'SELECT * FROM ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getSignInInfoStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static createSignInInfo(db, phone, email, password) {
    const createSignInInfoStatement =
      'INSERT INTO ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE +
      ' (' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_PHONE +
      ', ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_EMAIL +
      ', ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_PASSWORD +
      ') VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          createSignInInfoStatement,
          [phone, email, password],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeSignInInfo(db) {
    const deleteSignInInfoStatement =
      'DELETE FROM ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE +
      ' WHERE ' +
      AuthenticationStorageTable.description.AUTHENTICATION_TABLE_ID +
      ' > 0';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          deleteSignInInfoStatement,
          [],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }
}
