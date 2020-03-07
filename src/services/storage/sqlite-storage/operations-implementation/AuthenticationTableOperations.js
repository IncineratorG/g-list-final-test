import {
  AUTHENTICATION_TABLE,
  AUTHENTICATION_TABLE_EMAIL,
  AUTHENTICATION_TABLE_ID,
  AUTHENTICATION_TABLE_PASSWORD,
  AUTHENTICATION_TABLE_PHONE,
} from '../tables-description/authenticationTableDescription';

export class AuthenticationTableOperations {
  static getSignInInfo(db) {
    const getSignInInfoStatement = 'SELECT * FROM ' + AUTHENTICATION_TABLE;

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
      AUTHENTICATION_TABLE +
      ' (' +
      AUTHENTICATION_TABLE_PHONE +
      ', ' +
      AUTHENTICATION_TABLE_EMAIL +
      ', ' +
      AUTHENTICATION_TABLE_PASSWORD +
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
      AUTHENTICATION_TABLE +
      ' WHERE ' +
      AUTHENTICATION_TABLE_ID +
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
