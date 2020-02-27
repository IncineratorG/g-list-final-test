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
  SHOPPING_LISTS_TABLE_TOTAL_ITEMS,
  SHOPPING_LISTS_TABLE_COMPLETED_ITEMS,
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
import {PRODUCT_COMPLETED, PRODUCT_NOT_COMPLETED} from '../data/productStatus';
import {
  AUTHENTICATION_TABLE,
  AUTHENTICATION_TABLE_EMAIL,
  AUTHENTICATION_TABLE_ID,
  AUTHENTICATION_TABLE_PASSWORD,
  AUTHENTICATION_TABLE_PHONE,
} from './tables-description/authenticationTableDescription';

const DB_NAME = 'glist.db';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class SqliteStorage {
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
      SHOPPING_LISTS_TABLE_TOTAL_ITEMS +
      ' INTEGER NOT NULL, ' +
      SHOPPING_LISTS_TABLE_COMPLETED_ITEMS +
      ' INTEGER NOT NULL, ' +
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

    const createAuthenticationTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      AUTHENTICATION_TABLE +
      ' (' +
      AUTHENTICATION_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      AUTHENTICATION_TABLE_PHONE +
      ' TEXT, ' +
      AUTHENTICATION_TABLE_EMAIL +
      ' TEXT, ' +
      AUTHENTICATION_TABLE_PASSWORD +
      ' TEXT)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(createClassesTableStatement, [], (tx, result) => {
          tx.executeSql(createUnitsTableStatement, [], (tx, result) => {
            tx.executeSql(
              createShoppingListTableStatement,
              [],
              (tx, result) => {
                tx.executeSql(createShoppingListItemTable, [], (tx, result) => {
                  tx.executeSql(
                    createAuthenticationTableStatement,
                    [],
                    resolve,
                  );
                });
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

  static addShoppingList(name) {
    return ShoppingListsTableOperations.addShoppingList(db, name);
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

    const totalShoppingListItems = await ShoppingListItemsTableOperations.getItems(
      db,
      shoppingListId,
    );

    const completedShoppingListItems = await ShoppingListItemsTableOperations.getCompletedItems(
      db,
      shoppingListId,
    );

    await ShoppingListsTableOperations.updateShoppingList(
      db,
      shoppingListId,
      totalShoppingListItems.length,
      completedShoppingListItems.length,
    );

    return insertedId;
  }

  static async changeProductStatus(productId) {}

  static async setShoppingListItemStatus({productId, status}) {
    if (status !== PRODUCT_COMPLETED && status !== PRODUCT_NOT_COMPLETED) {
      console.log(
        'SqliteStorage->setShoppingListItemStatus(): BAD_STATUS: ' + status,
      );
      return -1;
    }

    await ShoppingListItemsTableOperations.setItemStatus(db, productId, status);
    const parentShoppingListIdData = await ShoppingListItemsTableOperations.getParentListId(
      db,
      productId,
    );

    const parentShoppingListId =
      parentShoppingListIdData.length > 0
        ? parentShoppingListIdData.item(0).parentId
        : -1;

    if (parentShoppingListId === -1) {
      return -1;
    }

    const totalShoppingListItems = await ShoppingListItemsTableOperations.getItems(
      db,
      parentShoppingListId,
    );

    const completedShoppingListItems = await ShoppingListItemsTableOperations.getCompletedItems(
      db,
      parentShoppingListId,
    );

    await ShoppingListsTableOperations.updateShoppingList(
      db,
      parentShoppingListId,
      totalShoppingListItems.length,
      completedShoppingListItems.length,
    );

    return parentShoppingListId;
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

    const removedProductsCount = await ShoppingListItemsTableOperations.removeItemsWithShoppingListId(
      db,
      shoppingListId,
    );

    return {removedShoppingListsCount, removedProductsCount};
  }

  static async getSignInInfo() {}

  static async updateSignInInfo({phone, email, password}) {
    console.log('PHONE: ' + phone + ' PASSWORD: ' + password);
  }
}
