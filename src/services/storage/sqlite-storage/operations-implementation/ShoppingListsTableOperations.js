import {
  SHOPPING_LISTS_TABLE,
  SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP,
  SHOPPING_LISTS_TABLE_ID,
  SHOPPING_LISTS_TABLE_LIST_NAME,
  SHOPPING_LISTS_TABLE_TOTAL_ITEMS,
  SHOPPING_LISTS_TABLE_COMPLETED_ITEMS,
  SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP,
} from '../tables-description/shoppingListsTableDescription';

export class ShoppingListsTableOperations {
  static isInitialized(db) {
    const isInitializedStatement =
      "SELECT name FROM sqlite_master WHERE type='table' AND name='" +
      SHOPPING_LISTS_TABLE +
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

  static addShoppingList(db, name) {
    const addShoppingListStatement =
      'INSERT INTO ' +
      SHOPPING_LISTS_TABLE +
      ' (' +
      SHOPPING_LISTS_TABLE_LIST_NAME +
      ', ' +
      SHOPPING_LISTS_TABLE_TOTAL_ITEMS +
      ', ' +
      SHOPPING_LISTS_TABLE_COMPLETED_ITEMS +
      ', ' +
      SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP +
      ', ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?, ?)';

    const timestamp = Date.now();

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addShoppingListStatement,
          [name, 0, 0, timestamp, timestamp],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static updateShoppingListUpdateTimestamp(db, id) {
    const updateStatement =
      'UPDATE ' +
      SHOPPING_LISTS_TABLE +
      ' SET ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          updateStatement,
          [timestamp, id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static updateShoppingList(db, id, totalItems, completedItems) {
    const updateStatement =
      'UPDATE ' +
      SHOPPING_LISTS_TABLE +
      ' SET ' +
      SHOPPING_LISTS_TABLE_TOTAL_ITEMS +
      ' = ?, ' +
      SHOPPING_LISTS_TABLE_COMPLETED_ITEMS +
      ' = ?, ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          updateStatement,
          [totalItems, completedItems, timestamp, id],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getShoppingLists(db) {
    const getShoppingListsStatement = 'SELECT * FROM ' + SHOPPING_LISTS_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getShoppingListsStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getShoppingListName(db, shoppingListId) {
    const getShoppingListNameStatement =
      'SELECT ' +
      SHOPPING_LISTS_TABLE_LIST_NAME +
      ' FROM ' +
      SHOPPING_LISTS_TABLE +
      ' WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getShoppingListNameStatement,
          [shoppingListId],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeShoppingList(db, shoppingListId) {
    const removeShoppingListStatement =
      'DELETE FROM ' +
      SHOPPING_LISTS_TABLE +
      ' WHERE ' +
      SHOPPING_LISTS_TABLE_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          removeShoppingListStatement,
          [shoppingListId],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }
}
