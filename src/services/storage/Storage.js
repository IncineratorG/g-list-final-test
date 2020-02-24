import {SqliteStorage} from './sqlite-storage/SqliteStorage';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';

export class Storage {
  static async isInitialized() {
    const result = await SqliteStorage.isInitialized();
    return result.length > 0;
  }

  static async init() {
    await SqliteStorage.init();
    await SqliteStorageHelper.insertInitialUnits();
    await SqliteStorageHelper.insertInitialClasses();
  }

  static async getAllShoppingLists() {
    const shoppingListsTableData = await SqliteStorage.getShoppingLists();

    const shoppingLists = [];
    for (let i = 0; i < shoppingListsTableData.length; ++i) {
      shoppingLists.push(shoppingListsTableData.item(i));
    }

    return shoppingLists;
  }

  static async createShoppingList({listName}) {
    try {
      return await SqliteStorage.addShoppingList(listName);
    } catch (e) {
      throw Error('Storage->createShoppingList(): ' + e);
    }
  }

  static async getShoppingListName(shoppingListId) {
    try {
      const nameData = await SqliteStorage.getShoppingListName(
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
      const unitsData = await SqliteStorage.getUnits();

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
      const classesData = await SqliteStorage.getClasses();

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
      return await SqliteStorage.addShoppingListItem({
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

  static async setProductStatus({productId, status}) {
    try {
      return await SqliteStorage.setShoppingListItemStatus({
        productId,
        status,
      });
    } catch (e) {
      throw Error('Storage->setProductStatus(): ' + e);
    }
  }

  static async changeProductStatus(productId) {}

  static async getProductsList(shoppingListId) {
    try {
      const productsListData = await SqliteStorage.getShoppingListItems(
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

  static async removeShoppingList(shoppingListId) {
    try {
      await SqliteStorage.removeShoppingList(shoppingListId);
    } catch (e) {
      throw Error('Storage->removeShoppingList(): ' + e);
    }
  }
}
