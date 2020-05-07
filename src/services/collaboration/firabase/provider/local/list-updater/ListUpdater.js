import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';
import database from '@react-native-firebase/database';
import {IdManager} from '../../../../../storage/firebase-storage/id-manager/IdManager';

export class ListUpdater {
  static async update({
    editor,
    shoppingListId,
    productId,
    productUpdater,
    totalItemsCount,
    completedItemsCount,
  }) {
    if (!editor || !shoppingListId || !productId || !productUpdater) {
      return {updates: undefined, error: FirebaseResponse.type.ERROR};
    }

    const updates = {};
    const updateTimestamp = Date.now();

    const {
      listPath,
      listCardPath,
      productPath,
      listSenderPath,
      listReceiversPath,
    } = this.getUpdatePaths({shoppingListId, productId});

    if (
      !listPath ||
      listPath.length <= 0 ||
      !listCardPath ||
      listCardPath.length <= 0 ||
      !productPath ||
      productPath.length <= 0 ||
      !listSenderPath ||
      listSenderPath.length <= 0 ||
      !listReceiversPath ||
      listReceiversPath.length <= 0
    ) {
      return {updates: undefined, error: FirebaseResponse.type.ERROR};
    }

    const {listSendersIds, listReceiversIds} = await this.getUsersIds({
      editor,
      listSenderPath,
      listReceiversPath,
    });

    if (!listSendersIds || !listReceiversIds) {
      return {updates: undefined, error: FirebaseResponse.type.ERROR};
    }

    this.updateList({
      updates,
      listPath,
      totalItemsCount,
      completedItemsCount,
      updateTimestamp,
    });
    this.updateListCard({
      updates,
      listCardPath,
      totalItemsCount,
      completedItemsCount,
      updateTimestamp,
    });
    this.updateProduct({updates, productPath, productUpdater, updateTimestamp});
    this.updateSender({
      updates,
      listSendersIds,
      shoppingListId,
      updateTimestamp,
    });
    this.updateReceivers({
      updates,
      listReceiversIds,
      shoppingListId,
      updateTimestamp,
    });

    return {updates, error: undefined};
  }

  static getUpdatePaths({shoppingListId, productId}) {
    // Путь до списка покупок.
    const listPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST,
      shoppingListId,
    });
    // Путь до карточки списка покупок.
    const listCardPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_CARD,
      shoppingListId,
    });
    // Путь до продукта в списке покупок.
    const productPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.PRODUCT,
      shoppingListId,
      productId: productId,
    });
    // Путь до создателя списка.
    const listSenderPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_SENDER,
      shoppingListId,
    });
    // Путь до получателей списка.
    const listReceiversPath = FirebasePaths.getPath({
      pathType: FirebasePaths.paths.SHOPPING_LIST_RECEIVERS,
      shoppingListId,
    });

    return {
      listPath,
      listCardPath,
      productPath,
      listSenderPath,
      listReceiversPath,
    };
  }

  static async getUsersIds({editor, listSenderPath, listReceiversPath}) {
    // Получаем данные создателя списка.
    const listSenderData = await database()
      .ref(listSenderPath)
      .once('value');
    // Получаем данные получателей списка.
    const listReceiversData = await database()
      .ref(listReceiversPath)
      .once('value');

    // Получаем ID создателя и получателей списка.
    const listSendersIds = [];
    const listReceiversIds = [];

    if (listSenderData.val() !== editor) {
      listSendersIds.push(IdManager.getId(listSenderData.val()));
    }
    listReceiversData.forEach(child => {
      if (child.val() !== editor) {
        listReceiversIds.push(IdManager.getId(child.val()));
      }
    });

    return {listSendersIds, listReceiversIds};
  }

  static updateList({
    updates,
    listPath,
    completedItemsCount,
    totalItemsCount,
    updateTimestamp,
  }) {
    // Обновляем данные в списке покупок.
    updates[
      listPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.COMPLETED_ITEMS_COUNT
    ] = completedItemsCount;
    updates[
      listPath + FirebasePaths.d + FirebasePaths.folderNames.TOTAL_ITEMS_COUNT
    ] = totalItemsCount;
    updates[
      listPath + FirebasePaths.d + FirebasePaths.folderNames.UPDATE_TIMESTAMP
    ] = updateTimestamp;

    return {updates};
  }

  static updateListCard({
    updates,
    listCardPath,
    completedItemsCount,
    totalItemsCount,
    updateTimestamp,
  }) {
    // Обновляем данные в карточке списка покупок.
    updates[
      listCardPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.COMPLETED_ITEMS_COUNT
    ] = completedItemsCount;
    updates[
      listCardPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.TOTAL_ITEMS_COUNT
    ] = totalItemsCount;
    updates[
      listCardPath +
        FirebasePaths.d +
        FirebasePaths.folderNames.UPDATE_TIMESTAMP
    ] = updateTimestamp;

    return {updates};
  }

  static updateProduct({
    updates,
    productUpdater,
    productPath,
    updateTimestamp,
  }) {
    productUpdater.data.updates = updates;
    productUpdater.data.productPath = productPath;
    productUpdater.data.updateTimestamp = updateTimestamp;

    productUpdater.run();

    return {updates};
  }

  static updateSender({
    updates,
    listSendersIds,
    shoppingListId,
    updateTimestamp,
  }) {
    // Обновляем время последнего обновления списка покупок у создателя списка.
    listSendersIds.forEach(senderId => {
      const userSendPath = FirebasePaths.getPath({
        pathType: FirebasePaths.paths.USER_SEND_DELIM,
        userId: senderId,
      });
      updates[
        userSendPath +
          shoppingListId +
          FirebasePaths.d +
          FirebasePaths.folderNames.UPDATE_TIMESTAMP
      ] = updateTimestamp;
    });

    return {updates};
  }

  static updateReceivers({
    updates,
    listReceiversIds,
    shoppingListId,
    updateTimestamp,
  }) {
    // Обновляем время последнего обновления списка покупок у получателей списка.
    listReceiversIds.forEach(receiverId => {
      const userReceivedPath = FirebasePaths.getPath({
        pathType: FirebasePaths.paths.USER_RECEIVED_DELIM,
        userId: receiverId,
      });
      updates[
        userReceivedPath +
          shoppingListId +
          FirebasePaths.d +
          FirebasePaths.folderNames.UPDATE_TIMESTAMP
      ] = updateTimestamp;
    });

    return {updates};
  }
}
