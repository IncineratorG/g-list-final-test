import {
  AUTHENTICATION_TABLE,
  AUTHENTICATION_TABLE_EMAIL,
  AUTHENTICATION_TABLE_PASSWORD,
  AUTHENTICATION_TABLE_PHONE,
} from '../tables-description/authenticationTableDescription';

export class AuthenticationTableOperations {
  // static updateSignInInfo(db, phone, email, password) {
  //     const updateStatement =
  //         'UPDATE ' + AUTHENTICATION_TABLE +
  //         ' SET ' + AUTHENTICATION_TABLE_PHONE + ' = ?, ' +
  //         AUTHENTICATION_TABLE_EMAIL + ' = ?, ' +
  //         AUTHENTICATION_TABLE_PASSWORD + ' = ? WHERE ' +
  //
  // }

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
    // const createSignInInfoStatement = ''
  }
}
