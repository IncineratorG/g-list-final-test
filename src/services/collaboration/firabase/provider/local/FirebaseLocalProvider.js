import {checkUserHandler} from './handlers/checkUserHandler';
import {shareShoppingListHandler} from './handlers/shareShoppingListHandler';
import {addSharedListCollaboratorHandler} from './handlers/addSharedListCollaboratorHandler';
import {removeSharedListCollaboratorHandler} from './handlers/removeSharedListCollaboratorHandler';
import {removeSharedShoppingListHandler} from './handlers/removeSharedShoppingListHandler';
import {updateListTimestampHandler} from './handlers/updateListTimestampHandler';
import {setProductStatusHandler} from './handlers/setProductStatusHandler';
import {addProductHandler} from './handlers/addProductHandler';
import {removeProductHandler} from './handlers/removeProductHandler';
import {FirebaseResponse} from '../../response/FirebaseResponse';

export class FirebaseLocalProvider {
  static async checkUser({email}) {
    return await checkUserHandler({email});
  }

  static async shareShoppingList({
    receivers,
    sender,
    shoppingList,
    shoppingListCard,
    units,
    classes,
  }) {
    const {status, sharedListKey} = await shareShoppingListHandler({
      receivers,
      sender,
      shoppingList,
      shoppingListCard,
      units,
      classes,
    });

    if (status === 'SUCCESS') {
      return {status: FirebaseResponse.type.SUCCESS, sharedListKey};
    } else {
      return {status: FirebaseResponse.type.ERROR, sharedListKey: undefined};
    }
  }

  static async addSharedListCollaborator({shoppingListId, collaborator}) {
    return await addSharedListCollaboratorHandler({
      shoppingListId,
      collaborator,
    });
  }

  static async removeSharedListCollaborator({shoppingListId, collaborator}) {
    const {
      status,
      remainingReceiversCount,
    } = await removeSharedListCollaboratorHandler({
      shoppingListId,
      collaborator,
    });

    if (status === 'SUCCESS') {
      return {status: FirebaseResponse.type.SUCCESS, remainingReceiversCount};
    } else {
      return {
        status: FirebaseResponse.type.ERROR,
        remainingReceiversCount: undefined,
      };
    }
  }

  static async removeSharedShoppingList({shoppingListId}) {
    const {status} = await removeSharedShoppingListHandler({shoppingListId});
    if (status === 'SUCCESS') {
      return FirebaseResponse.type.SUCCESS;
    } else {
      return FirebaseResponse.type.ERROR;
    }
  }

  static async updateListTimestamp({editor, shoppingListId}) {
    const {status} = await updateListTimestampHandler({editor, shoppingListId});
    if (status === 'SUCCESS') {
      return FirebaseResponse.type.SUCCESS;
    } else {
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
    const result = await setProductStatusHandler({
      editor,
      shoppingListId,
      productId,
      status,
      completedItemsCount,
      totalItemsCount,
    });

    return result;
  }

  static async addProduct({
    editor,
    shoppingListId,
    product,
    completedItemsCount,
    totalItemsCount,
  }) {
    const {status} = await addProductHandler({
      editor,
      shoppingListId,
      product,
      completedItemsCount,
      totalItemsCount,
    });

    if (status === 'SUCCESS') {
      return FirebaseResponse.type.SUCCESS;
    } else {
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
    const {status} = await removeProductHandler({
      editor,
      shoppingListId,
      productId,
      completedItemsCount,
      totalItemsCount,
    });

    if (status === 'SUCCESS') {
      return FirebaseResponse.type.SUCCESS;
    } else {
      return FirebaseResponse.type.ERROR;
    }
  }
}
