import {StorageNotifier} from '../../common-data/storage-notifier/StorageNotifier';
import {CollaborationStorageTable} from './tables-description/CollaborationStorageTable';
import {CollaborationStorageOperations} from './operations-implementation/CollaborationStorageOperations';

const DB_NAME = 'glist-collab.db';

const SQlite = require('react-native-sqlite-storage');
const db = SQlite.openDatabase(DB_NAME);

export class CollaborationStorage {
  static subscribe({entityIds, event, handler}) {
    return CollaborationStorage.notifier.subscribe({
      entityIds,
      event,
      handler,
    });
  }

  static init() {
    const createCollaborationTableStatement =
      'CREATE TABLE IF NOT EXISTS ' +
      CollaborationStorageTable.description.TABLE +
      ' (' +
      CollaborationStorageTable.description.ID +
      ' INTEGER PRIMARY KEY NOT NULL, ' +
      CollaborationStorageTable.description.EMAIL +
      ' TEXT)';

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(createCollaborationTableStatement, [], resolve);
      });
    });
  }

  static async isInitialized() {
    return await CollaborationStorageOperations.isInitialized(db);
  }

  static addCollaborator({email}) {}

  static removeCollaborator({id}) {}

  static getCollaborators() {}
}

CollaborationStorage.events = {
  COLLABORATOR_ADDED: 'COLLABORATOR_ADDED',
  COLLABORATOR_REMOVED: 'COLLABORATOR_REMOVED',
};
CollaborationStorage.notifier = new StorageNotifier({});
