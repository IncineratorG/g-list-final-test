import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {ProductUpdaters} from '../product-updaters/ProductUpdaters';
import {ListUpdater} from '../list-updater/ListUpdater';
import database from '@react-native-firebase/database';

export const addProductHandler = async ({
  editor,
  shoppingListId,
  product,
  completedItemsCount,
  totalItemsCount,
}) => {
  if (!editor || !shoppingListId || !product) {
    return {status: FirebaseResponse.type.ERROR};
  }

  const productUpdater = ProductUpdaters.get(ProductUpdaters.types.ADD_PRODUCT);
  productUpdater.data.product = product;

  const {updates, error} = await ListUpdater.update({
    editor,
    shoppingListId,
    completedItemsCount,
    totalItemsCount,
    productId: product.id,
    productUpdater,
  });

  if (error) {
    console.log('addProductHandler()->ERROR: ' + error);
    return {status: FirebaseResponse.type.ERROR};
  }

  // Применяем обновление.
  try {
    await database()
      .ref()
      .update(updates);

    return {status: FirebaseResponse.type.SUCCESS};
  } catch (e) {
    console.log('addProductHandler()->DATABASE_ERROR: ' + e);
    return {status: FirebaseResponse.type.ERROR};
  }
};
