import {StorageNotifier} from '../../common-data/storage-notifier/StorageNotifier';
import {CollaborationStorageTable} from './tables-description/CollaborationStorageTable';
import {CollaborationStorageOperations} from './operations-implementation/CollaborationStorageOperations';
import {Collaboration} from '../Collaboration';

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
      ' TEXT, ' +
      CollaborationStorageTable.description.STATUS +
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

  static async addCollaborator({email, status}) {
    const hasCollaboratorResult = await CollaborationStorageOperations.hasCollaborator(
      {db, email},
    );
    if (hasCollaboratorResult.length > 0) {
      return undefined;
    }

    const collaboratorId = await CollaborationStorageOperations.addCollaborator(
      {db, email, status},
    );

    const newCollaborator = {
      id: collaboratorId,
      email,
      status,
    };

    CollaborationStorage.notifier.notify({
      event: CollaborationStorage.events.COLLABORATOR_ADDED,
      data: {collaborator: newCollaborator},
    });

    return newCollaborator;
  }

  static async removeCollaborator({id}) {
    console.log('removeCollaborator(): ' + id);

    await CollaborationStorageOperations.removeCollaborator({db, id});

    CollaborationStorage.notifier.notify({
      event: CollaborationStorage.events.COLLABORATOR_REMOVED,
      data: {id},
    });
  }

  static async setCollaboratorStatus({id, status}) {
    await CollaborationStorageOperations.setCollaboratorStatus({
      db,
      id,
      status,
    });

    CollaborationStorage.notifier.notify({
      event: CollaborationStorage.events.COLLABORATOR_STATUS_CHANGED,
      data: {id, status},
    });
  }

  static async getCollaborators() {
    const collaboratorsData = await CollaborationStorageOperations.getCollaborators(
      db,
    );

    const collaborators = [];
    for (let i = 0; i < collaboratorsData.length; ++i) {
      if (
        collaboratorsData.item(i).status ===
        Collaboration.collaboratorStatus.UNKNOWN
      ) {
        await CollaborationStorageOperations.removeCollaborator({
          db,
          id: collaboratorsData.item(i).id,
        });
        continue;
      }

      collaborators.push(collaboratorsData.item(i));
    }

    return collaborators;
  }
}

CollaborationStorage.events = {
  COLLABORATOR_ADDED: 'COLLABORATOR_ADDED',
  COLLABORATOR_REMOVED: 'COLLABORATOR_REMOVED',
  COLLABORATOR_STATUS_CHANGED: 'COLLABORATOR_STATUS_CHANGED',
};
CollaborationStorage.notifier = new StorageNotifier({});
