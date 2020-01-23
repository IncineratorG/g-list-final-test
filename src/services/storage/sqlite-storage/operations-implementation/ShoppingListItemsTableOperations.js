import {
  SHOPPING_LIST_ITEM_TABLE,
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
import {PRODUCT_NOT_COMPLETED} from '../../data/productStatus';

export class ShoppingListItemsTableOperations {
  static addItem(db, shoppingListId, name, quantity, unitId, note, classId) {
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
            PRODUCT_NOT_COMPLETED,
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
}
