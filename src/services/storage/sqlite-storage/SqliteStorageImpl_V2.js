const DB_NAME = 'glist.db';

const CLASSES_TABLE = 'classes';
const CLASSES_TABLE_ID = 'id';
const CLASSES_TABLE_CLASS_NAME = 'name';

const UNITS_TABLE = 'units';
const UNITS_TABLE_ID = 'id';
const UNITS_TABLE_UNIT_NAME = 'name';

const SHOPPING_LISTS_TABLE = 'shoppingLists';
const SHOPPING_LISTS_TABLE_ID = 'id';
const SHOPPING_LISTS_TABLE_LIST_NAME = 'listName';
const SHOPPING_LISTS_TABLE_COMPLETION_STATUS = 'completionStatus';
const SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP = 'createTimestamp';
const SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP = 'updateTimestamp';

const SHOPPING_LIST_ITEM_TABLE = 'shoppingListItem';
const SHOPPING_LIST_ITEM_TABLE_ID = 'id';
const SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID = 'parentId';
const SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME = 'productName';
const SHOPPING_LIST_ITEM_TABLE_UNIT_ID = 'unitId';
const SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT = 'productCount';
const SHOPPING_LIST_ITEM_TABLE_CLASS_ID = 'classId';
const SHOPPING_LIST_ITEM_TABLE_NOTE = 'note';
const SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS = 'completionStatus';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class SqliteStorageImpl_V2 {
  static init() {
    const createClassesTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      CLASSES_TABLE +
      ' ' +
      '(' +
      CLASSES_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      CLASSES_TABLE_CLASS_NAME +
      ' TEXT NOT NULL)';

    const createUnitsTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      UNITS_TABLE +
      ' ' +
      '(' +
      UNITS_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      UNITS_TABLE_UNIT_NAME +
      ' TEXT NOT NULL)';

    const createShoppingListTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      SHOPPING_LISTS_TABLE +
      ' (' +
      SHOPPING_LISTS_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      SHOPPING_LISTS_TABLE_LIST_NAME +
      ' TEXT NOT NULL, ' +
      SHOPPING_LISTS_TABLE_COMPLETION_STATUS +
      ' TEXT NOT NULL, ' +
      SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP +
      ' INTEGER NOT NULL, ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ' INTEGER NOT NULL)';

    const createShoppingListItemTable =
      'CREATE TABLE IF NOT EXISTS ' +
      SHOPPING_LIST_ITEM_TABLE +
      ' (' +
      SHOPPING_LIST_ITEM_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID +
      ' INTEGER NOT NULL, ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
      ' TEXT NOT NULL, ' +
      SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
      ' INTEGER, ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
      ' INTEGER, ' +
      SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
      ' INTEGER NOT NULL, ' +
      SHOPPING_LIST_ITEM_TABLE_NOTE +
      ' TEXT, ' +
      SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
      ' TEXT NOT NULL)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(createClassesTableStatement, [], (tx, result) => {
          tx.executeSql(createUnitsTableStatement, [], (tx, result) => {
            tx.executeSql(
              createShoppingListTableStatement,
              [],
              (tx, result) => {
                tx.executeSql(createShoppingListItemTable, [], resolve);
              },
            );
          });
        });
      });
    });
  }

  static isInitialized() {
    // const isInitializedStatement = 'SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'table_name}\'';
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

  static addUnit(unitName) {
    const addUnitStatement =
      'INSERT INTO ' +
      UNITS_TABLE +
      ' (' +
      UNITS_TABLE_UNIT_NAME +
      ') VALUES (?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addUnitStatement,
          [unitName],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static removeUnit(unitName) {
    const removeUnitStatement =
      'DELETE FROM ' +
      UNITS_TABLE +
      ' WHERE ' +
      UNITS_TABLE_UNIT_NAME +
      ' LIKE ?';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          removeUnitStatement,
          [unitName],
          (_, result) => resolve(result.rowsAffected),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getUnits() {
    const getUnitsStatement = 'SELECT * FROM ' + UNITS_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getUnitsStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  static addClass(className) {
    const addClassStatement =
      'INSERT INTO ' +
      CLASSES_TABLE +
      ' (' +
      CLASSES_TABLE_CLASS_NAME +
      ') VALUES (?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addClassStatement,
          [className],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getClasses() {
    const getClassesStatement = 'SELECT * FROM ' + CLASSES_TABLE;

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          getClassesStatement,
          [],
          (_, result) => resolve(result.rows),
          (_, error) => reject(error),
        );
      });
    });
  }

  // static addProduct({name, classId}) {
  //   const addProductStatement =
  //     'INSERT INTO ' +
  //     PRODUCTS_TABLE +
  //     ' (' +
  //     PRODUCTS_TABLE_PRODUCT_NAME +
  //     ', ' +
  //     PRODUCTS_TABLE_CLASS_ID +
  //     ') VALUES (?, ?)';
  //   return new Promise((resolve, reject) => {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         addProductStatement,
  //         [name, classId],
  //         (_, result) => resolve(result.insertId),
  //         (_, error) => reject(error),
  //       );
  //     });
  //   });
  // }
  //
  // static removeProduct(id) {
  //   const removeProductStatement =
  //     'DELETE FROM ' + PRODUCTS_TABLE + ' WHERE ' + PRODUCTS_TABLE_ID + ' = ?';
  //
  //   return new Promise((resolve, reject) => {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         removeProductStatement,
  //         [id],
  //         (_, result) => resolve(result.rowsAffected),
  //         (_, error) => reject(error),
  //       );
  //     });
  //   });
  // }
  //
  // static getProducts() {
  //   const getProductsStatement = 'SELECT * FROM ' + PRODUCTS_TABLE;
  //
  //   return new Promise((resolve, reject) => {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         getProductsStatement,
  //         [],
  //         (_, result) => resolve(result.rows),
  //         (_, error) => reject(error),
  //       );
  //     });
  //   });
  // }

  static addShoppingList({name, status, timestamp}) {
    const addShoppingListStatement =
      'INSERT INTO ' +
      SHOPPING_LISTS_TABLE +
      ' (' +
      SHOPPING_LISTS_TABLE_LIST_NAME +
      ', ' +
      SHOPPING_LISTS_TABLE_COMPLETION_STATUS +
      ', ' +
      SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP +
      ', ' +
      SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP +
      ') VALUES (?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          addShoppingListStatement,
          [name, status, timestamp, timestamp],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error),
        );
      });
    });
  }

  static getShoppingLists() {
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

  static updateShoppingList() {}

  static removeShoppingList() {}
}
