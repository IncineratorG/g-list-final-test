import {SqliteStorageImpl_V2} from './sqlite-storage/SqliteStorageImpl_V2';
import {SqliteStorageHelper} from './sqlite-storage/SqliteStorageHelper';

export class Storage {
  static async isInitialized() {
    const result = await SqliteStorageImpl_V2.isInitialized();
    return result.length > 0;
  }

  static async init() {
    await SqliteStorageImpl_V2.init();
    await SqliteStorageHelper.insertInitialUnits();
    await SqliteStorageHelper.insertInitialClases();
  }

  static getAllShoppingLists() {
    return SqliteStorageImpl_V2.getShoppingLists();
  }
}
