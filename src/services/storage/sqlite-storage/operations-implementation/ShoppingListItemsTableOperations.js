import {
  SHOPPING_LIST_ITEM_TABLE,
  SHOPPING_LIST_ITEM_TABLE_ID,
  SHOPPING_LIST_ITEM_TABLE_CLASS_ID,
  SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS,
  SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP,
  SHOPPING_LIST_ITEM_TABLE_NOTE,
  SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID,
  SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT,
  SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME,
  SHOPPING_LIST_ITEM_TABLE_UNIT_ID,
  SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP,
} from '../tables-description/shoppingListItemTableDescription';
import {
  PRODUCT_COMPLETED,
  PRODUCT_NOT_COMPLETED,
} from '../../data/productStatus';

export class ShoppingListItemsTableOperations {
  static addItem(db, shoppingListId, name, quantity, unitId, note, classId, status) {
    const addProductStatement =
      'INSERT INTO ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' (' +
      SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_NOTE +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP +
      ', ' +
      SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const timestamp = Date.now();
    const productStatus = status ? status : PRODUCT_NOT_COMPLETED;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addProductStatement,
          [
            shoppingListId,
            name,
            quantity,
            unitId,
            classId,
            note,
            productStatus,
            timestamp,
            timestamp,
          ],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeItemsWithShoppingListId(db, shoppingListId) {
    const removeItemsStatement =
      'DELETE FROM ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          removeItemsStatement,
          [shoppingListId],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getItems(db, shoppingListId) {
    const getShoppingListItemsStatement =
      'SELECT * FROM ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getShoppingListItemsStatement,
          [shoppingListId],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getCompletedItems(db, shoppingListId) {
    const getCompletedItemsStatement =
      'SELECT * FROM ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
      ' = ? AND ' +
      SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
      ' LIKE ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getCompletedItemsStatement,
          [shoppingListId, PRODUCT_COMPLETED],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static setItemStatus(db, itemId, status) {
    const setItemStatusStatement =
      'UPDATE ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' SET ' +
      SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
      ' = ? WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          setItemStatusStatement,
          [status, itemId],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeItem(db, itemId) {
    const removeItemStatement =
      'DELETE FROM ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          removeItemStatement,
          [itemId],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getParentListId(db, itemId) {
    const getParentListIdStatement =
      'SELECT ' +
      SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
      ' FROM ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_ID +
      ' = ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getParentListIdStatement,
          [itemId],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }
}
