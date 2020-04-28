import {FirebaseCollaboration} from './firabase/FirebaseCollaboration';
import {StorageNotifier} from '../common-data/storage-notifier/StorageNotifier';
import {CollaborationStorage} from './storage/CollaborationStorage';

export class Collaboration {
  // ===
  // static async testShare({
  //   receivers,
  //   sender,
  //   shoppingList,
  //   shoppingListCard,
  //   units,
  //   classes,
  // }) {
  //   console.log('testShare()->START')
  //
  //   setTimeout(() => {
  //     console.log('testShare()->COMPLETE: ' + sender + ' - ' + shoppingList.id);
  //   }, 1000);
  // }
  // ===

  static async subscribe({entityIds, event, handler, once = false}) {
    const unsubscribe = once
      ? () => {}
      : Collaboration.notifier.subscribe({entityIds, event, handler});

    let data;
    if (event === Collaboration.events.COLLABORATOR_ADDED) {
      data = await CollaborationStorage.getCollaborators();
    } else if (event === Collaboration.events.COLLABORATOR_REMOVED) {
      data = await CollaborationStorage.getCollaborators();
    } else if (event === Collaboration.events.COLLABORATOR_STATUS_CHANGED) {
      data = await CollaborationStorage.getCollaborators();
    }

    return {unsubscribe, data};
  }

  static async init() {
    this.setSubscriptions();

    const result = await CollaborationStorage.isInitialized();
    if (result.length <= 0) {
      console.log('1');
      await CollaborationStorage.init();
    }
  }

  static off() {
    this.removeSubscriptions();
  }

  static setSubscriptions() {
    Collaboration.localSubscriptions.push(
      CollaborationStorage.subscribe({
        event: CollaborationStorage.events.COLLABORATOR_ADDED,
        handler: ({collaborator}) => {
          Collaboration.notifier.notify({
            event: Collaboration.events.COLLABORATOR_ADDED,
            data: collaborator,
          });
        },
      }),
    );

    Collaboration.localSubscriptions.push(
      CollaborationStorage.subscribe({
        event: CollaborationStorage.events.COLLABORATOR_REMOVED,
        handler: ({id}) => {
          Collaboration.notifier.notify({
            event: Collaboration.events.COLLABORATOR_REMOVED,
            data: id,
          });
        },
      }),
    );

    Collaboration.localSubscriptions.push(
      CollaborationStorage.subscribe({
        event: CollaborationStorage.events.COLLABORATOR_STATUS_CHANGED,
        handler: ({id, status}) => {
          Collaboration.notifier.notify({
            event: Collaboration.events.COLLABORATOR_STATUS_CHANGED,
            data: {id, status},
          });
        },
      }),
    );
  }

  static removeSubscriptions() {
    Collaboration.localSubscriptions.forEach(unsubscribeFunc => {
      unsubscribeFunc();
    });

    Collaboration.localSubscriptions.length = 0;
  }

  static async userExist({email}) {
    try {
      const result = await FirebaseCollaboration.checkUserExistence({email});
      return result === 'EXIST';
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addCollaborator({email, status}) {
    return await CollaborationStorage.addCollaborator({
      email,
      status,
    });
  }

  static async removeCollaborator({id}) {
    await CollaborationStorage.removeCollaborator({id});
  }

  static async setCollaboratorStatus({id, status}) {
    await CollaborationStorage.setCollaboratorStatus({id, status});
  }

  static async getCollaborators() {
    return await CollaborationStorage.getCollaborators();
  }

  static async sendMessage({receiverPhone, senderPhone, messageText}) {
    try {
      const result = await FirebaseCollaboration.sendTextMessage({
        receiverPhone,
        senderPhone,
        messageText,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async shareShoppingList({
    receivers,
    sender,
    shoppingList,
    shoppingListCard,
    units,
    classes,
  }) {
    console.log('Collaboration.shareShoppingList()');
    await this.testShareTimeout();
    return true;

    // try {
    //   await FirebaseCollaboration.shareShoppingList({
    //     receivers,
    //     sender,
    //     shoppingList,
    //     shoppingListCard,
    //     units,
    //     classes,
    //   });
    // } catch (e) {
    //   throw new Error(e);
    // }
  }

  static async addSharedListCollaborator({shoppingListId, collaborator}) {
    const result = await FirebaseCollaboration.addSharedListCollaborator({
      shoppingListId,
      collaborator,
    });

    return result === 'SUCCESS';
  }

  static async removeSharedListCollaborator({shoppingListId, collaborator}) {
    const result = await FirebaseCollaboration.removeSharedListCollaborator({
      shoppingListId,
      collaborator,
    });

    return result === 'SUCCESS';
  }

  static testShareTimeout() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  static async removeSharedShoppingList({shoppingListId}) {
    try {
      await FirebaseCollaboration.removeSharedShoppingList({shoppingListId});
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateListTimestamp({editor, shoppingListId}) {
    try {
      await FirebaseCollaboration.updateListTimestamp({editor, shoppingListId});
    } catch (e) {
      throw new Error(e);
    }
  }

  static async setProductStatus({
    editor,
    shoppingListId,
    productId,
    status,
    completedItemsCount,
    totalItemsCount,
  }) {
    try {
      await FirebaseCollaboration.setProductStatus({
        editor,
        shoppingListId,
        productId,
        status,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addProduct({
    editor,
    shoppingListId,
    product,
    completedItemsCount,
    totalItemsCount,
  }) {
    try {
      const status = await FirebaseCollaboration.addProduct({
        editor,
        shoppingListId,
        product,
        completedItemsCount,
        totalItemsCount,
      });

      return status === 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }

  static async removeProduct({
    editor,
    shoppingListId,
    productId,
    completedItemsCount,
    totalItemsCount,
  }) {
    try {
      await FirebaseCollaboration.removeProduct({
        editor,
        shoppingListId,
        productId,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

Collaboration.collaboratorStatus = {
  EXIST: 'EXIST',
  NOT_EXIST: 'NOT_EXIST',
  UNKNOWN: 'UNKNOWN',
};
Collaboration.events = {
  COLLABORATOR_ADDED: 'COLLABORATOR_ADDED',
  COLLABORATOR_REMOVED: 'COLLABORATOR_REMOVED',
  COLLABORATOR_STATUS_CHANGED: 'COLLABORATOR_STATUS_CHANGED',
};
Collaboration.notifier = new StorageNotifier({});
Collaboration.localSubscriptions = [];

// const usedUnits = [];
// const usedClasses = [];
// products.map(product => {
//   if (
//     usedUnits.filter(usedUnit => usedUnit.id === product.unitId).length <= 0
//   ) {
//     const unit = units.filter(u => u.id === product.unitId);
//     if (unit.length > 0) {
//       usedUnits.push(unit[0]);
//     }
//   }
//
//   if (
//     usedClasses.filter(usedClass => usedClass.id === product.classId)
//       .length <= 0
//   ) {
//     const cl = classes.filter(c => c.id === product.classId);
//     if (cl.length > 0) {
//       usedClasses.push(cl[0]);
//     }
//   }
// });
