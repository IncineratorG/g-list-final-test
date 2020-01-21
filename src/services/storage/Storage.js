import {SqliteStorageImpl} from './sqlite-storage/SqliteStorageImpl';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';
import {SHOPPING_LIST_NOT_COMPLETED} from './data/shoppingListStatus';

export class Storage {
  static async isInitialized() {
    const result = await SqliteStorageImpl.isInitialized();
    return result.length > 0;
  }

  static async init() {
    await SqliteStorageImpl.init();
    await SqliteStorageHelper.insertInitialUnits();
    await SqliteStorageHelper.insertInitialClasses();
  }

  static async getAllShoppingLists() {
    const shoppingListsTableData = await SqliteStorageImpl.getShoppingLists();

    const shoppingLists = [];
    for (let i = 0; i < shoppingListsTableData.length; ++i) {
      shoppingLists.push(shoppingListsTableData.item(i));
    }

    return shoppingLists;
  }

  static async createShoppingList({listName}) {
    try {
      return await SqliteStorageImpl.addShoppingList({
        name: listName,
        status: SHOPPING_LIST_NOT_COMPLETED,
      });
    } catch (e) {
      throw Error('Storage->createShoppingList(): ' + e);
    }
  }

  static async getShoppingListName(shoppingListId) {
    try {
      const nameData = await SqliteStorageImpl.getShoppingListName(
        shoppingListId,
      );

      if (nameData.length) {
        return nameData.item(0).listName;
      } else {
        return '';
      }
    } catch (e) {
      throw Error('Storage->getShoppingListName(): ' + e);
    }
  }

  static async getUnits() {
    try {
      const unitsData = await SqliteStorageImpl.getUnits();

      const units = [];
      for (let i = 0; i < unitsData.length; ++i) {
        units.push(unitsData.item(i));
      }

      return units;
    } catch (e) {
      throw Error('Storage->getUnits(): ' + e);
    }
  }

  static async getClasses() {
    try {
      const classesData = await SqliteStorageImpl.getClasses();

      const classes = [];
      for (let i = 0; i < classesData.length; ++i) {
        classes.push(classesData.item(i));
      }

      return classes;
    } catch (e) {
      throw Error('Storage->getClasses(): ' + e);
    }
  }

  static async addProduct({
    shoppingListId,
    name,
    quantity,
    unitId,
    note,
    classId,
  }) {
    try {
      return await SqliteStorageImpl.addShoppingListItem({
        shoppingListId,
        name,
        quantity,
        unitId,
        note,
        classId,
      });
    } catch (e) {
      throw Error('Storage->addProduct(): ' + e);
    }
  }

  static async getProductsList(shoppingListId) {
    try {
      const productsListData = await SqliteStorageImpl.getShoppingListItems(
        shoppingListId,
      );

      const productsList = [];
      for (let i = 0; i < productsListData.length; ++i) {
        productsList.push(productsListData.item(i));
      }

      return productsList;
    } catch (e) {
      throw Error('Storage->getProductsList(): ' + e);
    }
  }
}
