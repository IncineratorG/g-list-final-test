import {
  CLASSES_TABLE,
  CLASSES_TABLE_ID,
  CLASSES_TABLE_CLASS_NAME,
} from './tables-description/classesTableDescription';
import {
  UNITS_TABLE,
  UNITS_TABLE_ID,
  UNITS_TABLE_UNIT_NAME,
} from './tables-description/unitsTableDescription';
import {
  SHOPPING_LISTS_TABLE,
  SHOPPING_LISTS_TABLE_ID,
  SHOPPING_LISTS_TABLE_LIST_NAME,
  SHOPPING_LISTS_TABLE_COMPLETION_STATUS,
  SHOPPING_LISTS_TABLE_CREATE_TIMESTAMP,
  SHOPPING_LISTS_TABLE_UPDATE_TIMESTAMP,
} from './tables-description/shoppingListsTableDescription';
import {
  SHOPPING_LIST_ITEM_TABLE,
  SHOPPING_LIST_ITEM_TABLE_PARENT_LIST_ID,
  SHOPPING_LIST_ITEM_TABLE_CLASS_ID,
  SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS,
  SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP,
  SHOPPING_LIST_ITEM_TABLE_ID,
  SHOPPING_LIST_ITEM_TABLE_NOTE,
  SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT,
  SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME,
  SHOPPING_LIST_ITEM_TABLE_UNIT_ID,
  SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP,
} from './tables-description/shoppingListItemTableDescription';
import {UnitsTableOperations} from './operations-implementation/UnitsTableOperations';
import {ClassesTableOperations} from './operations-implementation/ClassesTableOperations';
import {ShoppingListsTableOperations} from './operations-implementation/ShoppingListsTableOperations';
import {ShoppingListItemsTableOperations} from './operations-implementation/ShoppingListItemsTableOperations';

const DB_NAME = 'glist.db';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class SqliteStorageImpl {
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
      ' INTEGER, ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_NAME +
      ' TEXT, ' +
      SHOPPING_LIST_ITEM_TABLE_UNIT_ID +
      ' INTEGER, ' +
      SHOPPING_LIST_ITEM_TABLE_PRODUCT_COUNT +
      ' INTEGER, ' +
      SHOPPING_LIST_ITEM_TABLE_CLASS_ID +
      ' INTEGER, ' +
      SHOPPING_LIST_ITEM_TABLE_NOTE +
      ' TEXT, ' +
      SHOPPING_LIST_ITEM_TABLE_COMPLETION_STATUS +
      ' TEXT, ' +
      SHOPPING_LIST_ITEM_TABLE_CREATE_TIMESTAMP +
      ' INTEGER NOT_NULL, ' +
      SHOPPING_LIST_ITEM_TABLE_UPDATE_TIMESTAMP +
      ' INTEGER NOT_NULL)';

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
    return ShoppingListsTableOperations.isInitialized(db);
  }

  static addUnit(unitName) {
    return UnitsTableOperations.addUnit(db, unitName);
  }

  static removeUnit(unitName) {
    UnitsTableOperations.removeUnit(db, unitName);
  }

  static getUnits() {
    return UnitsTableOperations.getUnits(db);
  }

  static addClass(className) {
    return ClassesTableOperations.addClass(db, className);
  }

  static getClasses() {
    return ClassesTableOperations.getClasses(db);
  }

  static addShoppingList({name, status}) {
    return ShoppingListsTableOperations.addShoppingList(db, name, status);
  }

  static getShoppingLists() {
    return ShoppingListsTableOperations.getShoppingLists(db);
  }

  static async addShoppingListItem({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
  }) {
    const insertedId = await ShoppingListItemsTableOperations.addItem(
      db,
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      classId,
    );

    await ShoppingListsTableOperations.updateShoppingListUpdateTimestamp(
      db,
      shoppingListId,
    );

    return insertedId;
  }

  static getShoppingListItems(shoppingListId) {
    return ShoppingListItemsTableOperations.getItems(db, shoppingListId);
  }

  static getShoppingListName(shoppingListId) {
    return ShoppingListsTableOperations.getShoppingListName(db, shoppingListId);
  }

  static async removeShoppingList(shoppingListId) {
    const removedShoppingListsCount = await ShoppingListsTableOperations.removeShoppingList(
      db,
      shoppingListId,
    );
    console.log('REMOVED_SHOPPING_LIST_COUNT: ' + removedShoppingListsCount);

    const removedProductsCount = await ShoppingListItemsTableOperations.removeItemsWithShoppingListId(
      db,
      shoppingListId,
    );
    console.log('REMOVED_PRODUCTS_COUNT: ' + removedProductsCount);

    return {removedShoppingListsCount, removedProductsCount};
  }

  // static test() {
  //   const testStatement = 'PRAGMA table_info(' + SHOPPING_LISTS_TABLE + ')';
  //
  //   return new Promise((resolve, reject) => {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         testStatement,
  //         [],
  //         (_, result) => resolve(result.rows),
  //         (_, error) => reject(error),
  //       );
  //     });
  //   });
  // }
}
