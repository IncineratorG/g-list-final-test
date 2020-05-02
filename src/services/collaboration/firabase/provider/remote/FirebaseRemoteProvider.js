import {FirebaseResponse} from '../../response/FirebaseResponse';

export class FirebaseRemoteProvider {
  static async checkUser({email}) {
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
        return FirebaseResponse.type.EXIST;
      } else {
        return FirebaseResponse.type.NOT_EXIST;
      }
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
    const data = {
      receivers,
      sender,
      shoppingList,
      shoppingListCard: shoppingListCard,
      units,
      classes,
    };
    const serializedData = JSON.stringify(data);

    try {
      const response = await fetch(
        'https://us-central1-surveillance-136a9.cloudfunctions.net/shareShoppingList',
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

      const {status, sharedListKey} = responseData;

      if (status === 'SUCCESS') {
        return {status: FirebaseResponse.type.SUCCESS, sharedListKey};
      } else {
        return {status: FirebaseResponse.type.ERROR, sharedListKey: undefined};
      }
    } catch (e) {
      throw new Error(e);
    }
  }

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

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
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

      const {status, remainingReceiversCount} = responseData;

      if (status === 'SUCCESS') {
        return {status: FirebaseResponse.type.SUCCESS, remainingReceiversCount};
      } else {
        return {
          status: FirebaseResponse.type.ERROR,
          remainingReceiversCount: undefined,
        };
      }
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

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
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

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
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

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
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

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
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

      if (status === 'SUCCESS') {
        return FirebaseResponse.type.SUCCESS;
      } else {
        return FirebaseResponse.type.ERROR;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
