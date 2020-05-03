import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {ProductUpdaters} from '../product-updaters/ProductUpdaters';
import {ListUpdater} from '../list-updater/ListUpdater';
import database from '@react-native-firebase/database';

export const setProductStatusHandler = async ({
  editor,
  shoppingListId,
  productId,
  status,
  completedItemsCount,
  totalItemsCount,
}) => {
  if (!editor || !shoppingListId || !productId || !status) {
    return FirebaseResponse.type.ERROR;
  }

  const productUpdater = ProductUpdaters.get(
    ProductUpdaters.types.UPDATE_STATUS,
  );
  productUpdater.data.status = status;

  const {updates, error} = await ListUpdater.update({
    editor,
    shoppingListId,
    completedItemsCount,
    totalItemsCount,
    productId,
    productUpdater,
  });

  if (error) {
    console.log('setProductStatusHandler()->ERROR: ' + error);
    return FirebaseResponse.type.ERROR;
  }

  // Применяем обновление.
  try {
    await database()
      .ref()
      .update(updates);

    return FirebaseResponse.type.SUCCESS;
  } catch (e) {
    console.log('setProductStatusHandler()->DATABASE_ERROR: ' + e);
    return FirebaseResponse.type.ERROR;
  }
};
