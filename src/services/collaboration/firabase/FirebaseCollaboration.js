import {FirebaseResponse} from './response/FirebaseResponse';
import {FirebaseLocalProvider} from './provider/local/FirebaseLocalProvider';

export class FirebaseCollaboration {
  static async checkUserExistence({email}) {
    try {
      return await FirebaseCollaboration.provider.checkUser({email});
    } catch (e) {
      console.log('FirebaseCollaboration.checkUserExistence()->ERROR: ' + e);
      console.log(
        'FirebaseCollaboration.checkUserExistence()->INPUT: ' + email,
      );
      return FirebaseResponse.type.ERROR;
    }
  }

  static async sendTextMessage({receiverPhone, senderPhone, messageText}) {
    const data = {
      receiver: receiverPhone,
      sender: senderPhone,
      textMessage: messageText,
    };
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/sendMessage',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: serializedData,
        },
      );

      const responseData = await response.json();

      console.log('RESPONSE: ' + JSON.stringify(responseData));

      return 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }

  static testShareTimeout() {
    return new Promise(resolve =>
      setTimeout(() => {
        const sharedListKey = Date.now();
        const status = FirebaseCollaboration.status.SUCCESS;

        resolve({sharedListKey, status});
      }, 2000),
    );
  }

  static async shareShoppingList({
    receivers,
    sender,
    shoppingList,
    shoppingListCard,
    units,
    classes,
  }) {
    try {
      const {
        status,
        sharedListKey,
      } = await FirebaseCollaboration.provider.shareShoppingList({
        receivers,
        sender,
        shoppingList,
        shoppingListCard,
        units,
        classes,
      });

      return {status, sharedListKey};
    } catch (e) {
      console.log('FirebaseCollaboration.shareShoppingList()->ERROR: ' + e);
      return FirebaseResponse.type.ERROR;
    }
  }

  static async addSharedListCollaborator({shoppingListId, collaborator}) {
    try {
      return await FirebaseCollaboration.provider.addSharedListCollaborator({
        shoppingListId,
        collaborator,
      });
    } catch (e) {
      console.log(
        'FirebaseCollaboration.addSharedListCollaborator()->ERROR: ' + e,
      );
      return FirebaseResponse.type.ERROR;
    }
  }

  static async removeSharedListCollaborator({shoppingListId, collaborator}) {
    try {
      const {
        status,
      } = await FirebaseCollaboration.provider.removeSharedListCollaborator({
        shoppingListId,
        collaborator,
      });
      return status;
    } catch (e) {
      console.log(
        'FirebaseCollaboration.removeSharedListCollaborator()->ERROR: ' + e,
      );
      return FirebaseResponse.type.ERROR;
    }
  }

  static async removeSharedShoppingList({shoppingListId}) {
    try {
      return await FirebaseCollaboration.provider.removeSharedShoppingList({
        shoppingListId,
      });
    } catch (e) {
      console.log(
        'FirebaseCollaboration.removeSharedShoppingList()->ERROR: ' + e,
      );
      return FirebaseResponse.type.ERROR;
    }
  }

  static async updateListTimestamp({editor, shoppingListId}) {
    try {
      return await FirebaseCollaboration.provider.updateListTimestamp({
        editor,
        shoppingListId,
      });
    } catch (e) {
      console.log('FirebaseCollaboration.updateListTimestamp()->ERROR: ' + e);
      return FirebaseResponse.type.ERROR;
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
      return await FirebaseCollaboration.provider.setProductStatus({
        editor,
        shoppingListId,
        productId,
        status,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      console.log('FirebaseCollaboration.setProductStatus()->ERROR: ' + e);
      return FirebaseResponse.type.ERROR;
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
      return await FirebaseCollaboration.provider.addProduct({
        editor,
        shoppingListId,
        product,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      console.log('FirebaseCollaboration.addProduct()->ERROR: ' + e);
      return FirebaseResponse.type.ERROR;
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
      return await FirebaseCollaboration.provider.removeProduct({
        editor,
        shoppingListId,
        productId,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      console.log('FirebaseCollaboration.removeProduct()->ERROR: ' + e);
      return FirebaseResponse.type.ERROR;
    }
  }
}

FirebaseCollaboration.status = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  EXIST: 'EXIST',
  NOT_EXIST: 'NOT_EXIST',
};
FirebaseCollaboration.provider = FirebaseLocalProvider;
