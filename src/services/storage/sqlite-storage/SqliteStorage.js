import {
  CLASSES_TABLE,
  CLASSES_TABLE_ID,
  CLASSES_TABLE_CLASS_NAME,
  CLASSES_TABLE_CLASS_COLOR,
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
  SHOPPING_LISTS_TABLE_CREATOR,
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
import {StorageNotifier} from '../../common-data/storage-notifier/StorageNotifier';

const DB_NAME = 'glist.db';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class SqliteStorage {
  static subscribe({entityIds, event, handler}) {
    return SqliteStorage.notifier.subscribe({entityIds, event, handler});
  }

  static init() {
    const createClassesTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      CLASSES_TABLE +
      ' ' +
      '(' +
      CLASSES_TABLE_ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      CLASSES_TABLE_CLASS_NAME +
      ' TEXT NOT NULL, ' +
      CLASSES_TABLE_CLASS_COLOR +
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
      SHOPPING_LISTS_TABLE_CREATOR +
      ' TEXT NOT_NULL, ' +
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

  static async getUnits() {
    const unitsData = await UnitsTableOperations.getUnits(db);

    const units = [];
    for (let i = 0; i < unitsData.length; ++i) {
      units.push(unitsData.item(i));
    }

    return units;
  }

  static addClass({className, classColor}) {
    return ClassesTableOperations.addClass(db, className, classColor);
  }

  static async getClasses() {
    const classesData = await ClassesTableOperations.getClasses(db);

    const classes = [];
    for (let i = 0; i < classesData.length; ++i) {
      classes.push(classesData.item(i));
    }

    return classes;
  }

  static async addShoppingList(name, creator) {
    const shoppingListId = await ShoppingListsTableOperations.addShoppingList(
      db,
      name,
      creator,
    );

    SqliteStorage.notifier.notify({
      event: SqliteStorage.events.LOCAL_SHOPPING_LIST_ADDED,
      data: {shoppingListId, name},
    });

    return shoppingListId;
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

    SqliteStorage.notifier.notify({
      event: SqliteStorage.events.LOCAL_SHOPPING_LIST_REMOVED,
      data: {id: shoppingListId},
    });

    return {removedShoppingListsCount, removedProductsCount};
  }

  static async getShoppingLists() {
    const shoppingListsTableData = await ShoppingListsTableOperations.getShoppingLists(
      db,
    );

    const shoppingLists = [];
    for (let i = 0; i < shoppingListsTableData.length; ++i) {
      shoppingLists.push(shoppingListsTableData.item(i));
    }

    return shoppingLists;
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
    status,
  }) {
    const insertedId = await ShoppingListItemsTableOperations.addItem(
      db,
      shoppingListId,
      name,
      quantity,
      unitId,
      note,
      classId,
      status,
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

    let addedProduct;
    for (let i = 0; i < totalShoppingListItems.length; ++i) {
      if (totalShoppingListItems.item(i).id === insertedId) {
        addedProduct = totalShoppingListItems.item(i);
        break;
      }
    }

    SqliteStorage.notifier.notify({
      event: SqliteStorage.events.LOCAL_PRODUCTS_ADDED,
      data: {shoppingListId, products: [addedProduct]},
    });
    // SqliteStorage.notifier.notify({
    //   event: SqliteStorage.events.LOCAL_PRODUCT_ADDED,
    //   data: {
    //     shoppingListId,
    //     productId: insertedId,
    //     name,
    //     quantity,
    //     unitId,
    //     note,
    //     classId,
    //   },
    // });

    return insertedId;
  }

  static async setProductStatus({shoppingListId, productId, status}) {
    if (status !== PRODUCT_COMPLETED && status !== PRODUCT_NOT_COMPLETED) {
      console.log(
        'SqliteStorage->setShoppingListItemStatus(): BAD_STATUS: ' + status,
      );
      return -1;
    }

    await ShoppingListItemsTableOperations.setItemStatus(db, productId, status);

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

    let updatedProduct;
    for (let i = 0; i < totalShoppingListItems.length; ++i) {
      if (totalShoppingListItems.item(i).id === productId) {
        updatedProduct = totalShoppingListItems.item(i);
        break;
      }
    }

    SqliteStorage.notifier.notify({
      event: SqliteStorage.events.LOCAL_PRODUCTS_UPDATED,
      data: {shoppingListId, products: [updatedProduct]},
    });
    // SqliteStorage.notifier.notify({
    //   event: SqliteStorage.events.LOCAL_PRODUCT_UPDATED,
    //   data: {shoppingListId, productId},
    //   // data: {shoppingListId, productId, status},
    // });

    return shoppingListId;
  }

  static async removeProduct({shoppingListId, productId}) {
    await ShoppingListItemsTableOperations.removeItem(db, productId);

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

    let removedProduct = {id: productId};

    SqliteStorage.notifier.notify({
      event: SqliteStorage.events.LOCAL_PRODUCTS_DELETED,
      data: {shoppingListId, products: [removedProduct]},
    });
    // SqliteStorage.notifier.notify({
    //   event: SqliteStorage.events.LOCAL_PRODUCT_UPDATED,
    //   data: {shoppingListId, productId},
    // });

    return shoppingListId;
  }

  static async getShoppingList(shoppingListId) {
    const productsListData = await ShoppingListItemsTableOperations.getItems(
      db,
      shoppingListId,
    );

    const productsList = [];
    for (let i = 0; i < productsListData.length; ++i) {
      productsList.push(productsListData.item(i));
    }

    const descriptionData = await ShoppingListsTableOperations.getShoppingListDescription(
      db,
      shoppingListId,
    );

    return {
      id: shoppingListId,
      name: descriptionData.length ? descriptionData.item(0).name : '',
      totalItemsCount: descriptionData.length
        ? descriptionData.item(0).totalItemsCount
        : '',
      completedItemsCount: descriptionData.length
        ? descriptionData.item(0).completedItemsCount
        : '',
      createTimestamp: descriptionData.length
        ? descriptionData.item(0).createTimestamp
        : '',
      updateTimestamp: descriptionData.length
        ? descriptionData.item(0).updateTimestamp
        : '',
      creator: descriptionData.length ? descriptionData.item(0).creator : '',
      productsList,
    };
  }
}

SqliteStorage.events = {
  LOCAL_SHOPPING_LIST_ADDED: 'LOCAL_SHOPPING_LIST_ADDED',
  LOCAL_SHOPPING_LIST_REMOVED: 'LOCAL_SHOPPING_LIST_REMOVED',
  // LOCAL_PRODUCT_ADDED: 'LOCAL_PRODUCT_ADDED',
  // LOCAL_PRODUCT_UPDATED: 'LOCAL_PRODUCT_UPDATED',

  LOCAL_PRODUCTS_ADDED: 'LOCAL_PRODUCTS_ADDED',
  LOCAL_PRODUCTS_UPDATED: 'LOCAL_PRODUCTS_UPDATED',
  LOCAL_PRODUCTS_DELETED: 'LOCAL_PRODUCTS_DELETED',
};
SqliteStorage.notifier = new StorageNotifier({});
