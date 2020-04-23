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

  static addCollaborator({db, email}) {
    const addCollaboratorStatement =
      'INSERT INTO ' +
      CollaborationStorageTable.description.TABLE +
      ' (' +
      CollaborationStorageTable.description.EMAIL +
      ') VALUES (?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addCollaboratorStatement,
          [email],
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
}
