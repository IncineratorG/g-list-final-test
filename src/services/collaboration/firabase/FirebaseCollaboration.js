export class FirebaseCollaboration {
  static async checkUserExistence({email}) {
    const checkData = {email};
    const serializedCheckData = JSON.stringify(checkData);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/checkUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: serializedCheckData,
        },
      );

      const responseData = await response.json();

      if (responseData.status === 'USER_EXISTS') {
        return 'EXIST';
      } else {
        return 'NOT_EXIST';
      }
    } catch (e) {
      throw new Error(e);
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

  // ===
  // =====
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
    console.log('FirebaseCollaboration.shareShoppingList()');

    const {status, sharedListKey} = await this.testShareTimeout();

    return {status, sharedListKey};
  }
  // =====
  // ===

  // static async shareShoppingList({
  //   receivers,
  //   sender,
  //   shoppingList,
  //   shoppingListCard,
  //   units,
  //   classes,
  // }) {
  //   console.log('HERE_HERE_HERE');
  //
  //   const data = {
  //     receivers,
  //     sender,
  //     shoppingList,
  //     shoppingListCard: shoppingListCard,
  //     units,
  //     classes,
  //   };
  //   const serializedData = JSON.stringify(data);
  //
  //   try {
  //     const response = await fetch(
  //       'https://us-central1-surveillance-136a9.cloudfunctions.net/shareShoppingList',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: serializedData,
  //       },
  //     );
  //
  //     const responseData = await response.json();
  //
  //     const {status, sharedListKey} = responseData;
  //
  //     console.log('RESPONSE_STATUS: ' + status);
  //     console.log('RESPONSE_KEY: ' + sharedListKey);
  //
  //     return 'SUCCESS';
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  static async addSharedListCollaborator({shoppingListId, collaborator}) {
    const data = {shoppingListId, collaborator};
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/addCollaborator',
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

      const {status} = responseData;

      console.log('addSharedListCollaborator()->RESPONSE_STATUS: ' + status);

      return status;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async removeSharedListCollaborator({shoppingListId, collaborator}) {
    const data = {shoppingListId, collaborator};
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/removeCollaborator',
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

      const {status} = responseData;

      console.log('removeSharedListCollaborator()->RESPONSE_STATUS: ' + status);

      return status;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async removeSharedShoppingList({shoppingListId}) {
    const data = {shoppingListId};
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/removeShoppingList',
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

      const {status} = responseData;

      console.log('RESPONSE_STATUS: ' + status);

      return 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateListTimestamp({editor, shoppingListId}) {
    const data = {editor, shoppingListId};
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/updateTimestamp',
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

      const {status} = responseData;

      console.log('RESPONSE_STATUS: ' + status);

      return 'SUCCESS';
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
    const data = {
      editor,
      shoppingListId,
      productId,
      status,
      completedItemsCount,
      totalItemsCount,
    };
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/setProductStatus',
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

      const {status} = responseData;

      console.log('RESPONSE_STATUS: ' + status);

      return 'SUCCESS';
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
    const data = {
      editor,
      shoppingListId,
      product,
      completedItemsCount,
      totalItemsCount,
    };
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/addProduct',
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

      const {status} = responseData;

      console.log('RESPONSE_STATUS: ' + status);

      return status;
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
    const data = {
      editor,
      shoppingListId,
      productId,
      completedItemsCount,
      totalItemsCount,
    };
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/removeProduct',
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

      const {status} = responseData;

      console.log('RESPONSE_STATUS: ' + status);

      return 'SUCCESS';
    } catch (e) {
      throw new Error(e);
    }
  }
}

FirebaseCollaboration.status = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
