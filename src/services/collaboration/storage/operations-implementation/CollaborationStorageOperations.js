import {CollaborationStorageTable} from '../tables-description/CollaborationStorageTable';

export class CollaborationStorageOperations {
  static isInitialized(db) {
    const isInitializedStatement =
      "SELECT name FROM sqlite_master WHERE type='table' AND name='" +
      CollaborationStorageTable.description.TABLE +
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

  static hasCollaborator({db, email}) {
    const hasCollaboratorStatement =
      'SELECT * FROM ' +
      CollaborationStorageTable.description.TABLE +
      ' WHERE ' +
      CollaborationStorageTable.description.EMAIL +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          hasCollaboratorStatement,
          [email],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static addCollaborator({db, email, status}) {
    const addCollaboratorStatement =
      'INSERT INTO ' +
      CollaborationStorageTable.description.TABLE +
      ' (' +
      CollaborationStorageTable.description.EMAIL +
      ', ' +
      CollaborationStorageTable.description.STATUS +
      ') VALUES (?, ?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addCollaboratorStatement,
          [email, status],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeCollaborator({db, id}) {
    const removeCollaboratorStatement =
      'DELETE FROM ' +
      CollaborationStorageTable.description.TABLE +
      ' WHERE ' +
      CollaborationStorageTable.description.ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          removeCollaboratorStatement,
          [id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static setCollaboratorStatus({db, id, status}) {
    const setCollaboratorStatusStatement =
      'UPDATE ' +
      CollaborationStorageTable.description.TABLE +
      ' SET ' +
      CollaborationStorageTable.description.STATUS +
      ' = ? WHERE ' +
      CollaborationStorageTable.description.ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          setCollaboratorStatusStatement,
          [status, id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getCollaborators(db) {
    const getCollaboratorsStatement =
      'SELECT * FROM ' + CollaborationStorageTable.description.TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getCollaboratorsStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getCollaborator({db, id}) {
    const getCollaboratorStatement =
      'SELECT * FROM ' +
      CollaborationStorageTable.description.TABLE +
      ' WHERE ' +
      CollaborationStorageTable.description.ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getCollaboratorStatement,
          [id],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }
}
