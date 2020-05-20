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
  static addItem({
    db,
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
    status,
  }) {
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

  static addItems({
    db,
    shoppingListId,
    items,
    useItemsTimestamps = false,
    useItemsCompletionStatus = false,
  }) {
    if (!items || !items.length) {
      console.log('ShoppingListItemsTableOperations->addItems(): NO_ITEMS');
      return;
    }

    const currentTimestamp = Date.now();
    const defaultItemStatus = PRODUCT_NOT_COMPLETED;

    let addProductsStatement =
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
      ') VALUES ';

    const valuesArray = [];
    for (let i = 0; i < items.length; ++i) {
      let values = '(?, ?, ?, ?, ?, ?, ?, ?, ?)';
      if (i !== items.length - 1) {
        values = values + ',';
      }
      addProductsStatement = addProductsStatement + values;

      valuesArray.push(shoppingListId);
      valuesArray.push(items[i].name);
      valuesArray.push(items[i].quantity);
      valuesArray.push(items[i].unitId);
      valuesArray.push(items[i].classId);
      valuesArray.push(items[i].note);
      if (useItemsCompletionStatus) {
        valuesArray.push(items[i].completionStatus);
      } else {
        valuesArray.push(defaultItemStatus);
      }
      if (useItemsTimestamps) {
        valuesArray.push(items[i].createTimestamp);
        valuesArray.push(items[i].updateTimestamp);
      } else {
        valuesArray.push(currentTimestamp);
        valuesArray.push(currentTimestamp);
      }
    }

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addProductsStatement,
          valuesArray,
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static updateItem(
    db,
    shoppingListId,
    productId,
    name,
    quantity,
    unitId,
    note,
    classId,
    status,
  ) {
    const updateItemStatement =
      'UPDATE ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' SET ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
      ' = ? , ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
      ' = ?, ' +
      SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
      ' = ?, ' +
      SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
      ' = ?, ' +
      SHOPPING_LIST_ITEM_TABLE_NOTE +
      ' = ?, ' +
      SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
      ' = ?, ' +
      SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP +
      ' = ? WHERE ' +
      SHOPPING_LIST_ITEM_TABLE_ID +
      ' = ?';

    const timestamp = Date.now();
    const productStatus = status ? status : PRODUCT_NOT_COMPLETED;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          updateItemStatement,
          [
            name,
            quantity,
            unitId,
            classId,
            note,
            productStatus,
            timestamp,
            productId,
          ],
          (_, result) => resolve(result.rowsAffected),
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

// static addItems({
//   db,
//   shoppingListId,
//   items,
//   useItemsTimestamps = false,
//   useItemsCompletionStatus = false,
// }) {
//   if (!items || !items.length) {
//     console.log('ShoppingListItemsTableOperations->addItems(): NO_ITEMS');
//     return;
//   }
//
//   const currentTimestamp = Date.now();
//   const defaultItemStatus = PRODUCT_NOT_COMPLETED;
//
//   let addProductsStatement = 'BEGIN TRANSACTION;';
//   for (let i = 0; i < items.length; ++i) {
//     const addStatement =
//       ' INSERT INTO ' +
//       SHOPPING_LIST_ITEM_TABLE +
//       ' (' +
//       SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_NOTE +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP +
//       ', ' +
//       SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP +
//       ')' +
//       ' VALUES (' +
//       shoppingListId +
//       ', ' +
//       items[i].name.toString() +
//       ', ' +
//       items[i].unitId +
//       ', ' +
//       items[i].quantity +
//       ', ' +
//       items[i].classId +
//       ', ' +
//       items[i].note.toString() +
//       ', ' +
//       defaultItemStatus +
//       ', ' +
//       currentTimestamp +
//       ', ' +
//       currentTimestamp +
//       ');';
//     addProductsStatement = addProductsStatement + addStatement;
//   }
//   addProductsStatement = addProductsStatement + ' COMMIT;';
//
//   // let addProductsStatement =
//   //   'INSERT INTO ' +
//   //   SHOPPING_LIST_ITEM_TABLE +
//   //   ' SELECT ' +
//   //   shoppingListId +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
//   //   ', ' +
//   //   items[0].name +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
//   //   ', ' +
//   //   items[0].quantity +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
//   //   ', ' +
//   //   items[0].unitId +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
//   //   ', ' +
//   //   items[0].classId +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
//   //   ', ' +
//   //   items[0].note +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_NOTE +
//   //   ', ' +
//   //   (useItemsCompletionStatus
//   //     ? items[0].completionStatus
//   //     : defaultItemStatus) +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
//   //   ', ' +
//   //   (useItemsTimestamps ? items[0].createTimestamp : currentTimestamp) +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP +
//   //   ', ' +
//   //   (useItemsTimestamps ? items[0].updateTimestamp : currentTimestamp) +
//   //   ' AS ' +
//   //   SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP;
//   //
//   // for (let i = 1; i < items.length; ++i) {
//   //   const nextItemStatement =
//   //     ' UNION ALL SELECT ' +
//   //     shoppingListId +
//   //     ', ' +
//   //     items[i].name +
//   //     ', ' +
//   //     items[i].quantity +
//   //     ', ' +
//   //     items[i].unitId +
//   //     ', ' +
//   //     items[i].classId +
//   //     ', ' +
//   //     items[i].note +
//   //     ', ' +
//   //     (useItemsCompletionStatus
//   //       ? items[i].completionStatus
//   //       : defaultItemStatus) +
//   //     ', ' +
//   //     (useItemsTimestamps ? items[i].createTimestamp : currentTimestamp) +
//   //     ', ' +
//   //     (useItemsTimestamps ? items[i].updateTimestamp : currentTimestamp);
//   //
//   //   addProductsStatement = addProductsStatement + nextItemStatement;
//   // }
//
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         addProductsStatement,
//         [],
//         (_, result) => resolve(result),
//         (_, error) => reject(error),
//       );
//     });
//   });
// }
// static addItems({
//   db,
//   shoppingListId,
//   items,
//   useItemsTimestamps = false,
//   useItemsCompletionStatus = false,
// }) {
//   if (!items || !items.length) {
//     console.log('ShoppingListItemsTableOperations->addItems(): NO_ITEMS');
//     return;
//   }
//
//   const currentTimestamp = Date.now();
//   const defaultItemStatus = PRODUCT_NOT_COMPLETED;
//
//   let addProductsStatement =
//     'INSERT INTO ' +
//     SHOPPING_LIST_ITEM_TABLE +
//     ' SELECT ' +
//     shoppingListId +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
//     ', ' +
//     items[0].name.toString() +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
//     ', ' +
//     items[0].quantity +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
//     ', ' +
//     items[0].unitId +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
//     ', ' +
//     items[0].classId +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
//     ', ' +
//     items[0].note.toString() +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_NOTE +
//     ', ' +
//     (useItemsCompletionStatus
//       ? items[0].completionStatus
//       : defaultItemStatus) +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
//     ', ' +
//     (useItemsTimestamps ? items[0].createTimestamp : currentTimestamp) +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP +
//     ', ' +
//     (useItemsTimestamps ? items[0].updateTimestamp : currentTimestamp) +
//     ' AS ' +
//     SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP;
//
//   for (let i = 1; i < items.length; ++i) {
//     const nextItemStatement =
//       ' UNION ALL SELECT ' +
//       shoppingListId +
//       ', ' +
//       items[i].name.toString() +
//       ', ' +
//       items[i].quantity +
//       ', ' +
//       items[i].unitId +
//       ', ' +
//       items[i].classId +
//       ', ' +
//       items[i].note.toString() +
//       ', ' +
//       (useItemsCompletionStatus
//         ? items[i].completionStatus
//         : defaultItemStatus) +
//       ', ' +
//       (useItemsTimestamps ? items[i].createTimestamp : currentTimestamp) +
//       ', ' +
//       (useItemsTimestamps ? items[i].updateTimestamp : currentTimestamp);
//
//     addProductsStatement = addProductsStatement + nextItemStatement;
//   }
//
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         addProductsStatement,
//         [],
//         (_, result) => resolve(),
//         (_, error) => reject(error),
//       );
//     });
//   });
// }
