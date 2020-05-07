import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {ProductUpdaters} from '../product-updaters/ProductUpdaters';
import {ListUpdater} from '../list-updater/ListUpdater';
import database from '@react-native-firebase/database';

export const removeProductHandler = async ({
  editor,
  shoppingListId,
  productId,
  completedItemsCount,
  totalItemsCount,
}) => {
  if (!editor || !shoppingListId || !productId) {
    return {status: FirebaseResponse.type.ERROR};
  }

  const productUpdater = ProductUpdaters.get(
    ProductUpdaters.types.REMOVE_PRODUCT,
  );

  const {updates, error} = await ListUpdater.update({
    editor,
    shoppingListId,
    completedItemsCount,
    totalItemsCount,
    productId,
    productUpdater,
  });

  if (error) {
    console.log('removeProductHandler()->ERROR: ' + error);
    return {status: FirebaseResponse.type.ERROR};
  }

  // Применяем обновление.
  try {
    await database()
      .ref()
      .update(updates);

    return {status: FirebaseResponse.type.SUCCESS};
  } catch (e) {
    console.log('removeProductHandler()->DATABASE_ERROR: ' + e);
    return {status: FirebaseResponse.type.ERROR};
  }
};
