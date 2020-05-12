import {FirebaseResponse} from '../../../response/FirebaseResponse';
import {ProductUpdaters} from '../product-updaters/ProductUpdaters';
import {ListUpdater} from '../list-updater/ListUpdater';
import database from '@react-native-firebase/database';

export const updateProductHandler = async ({
  editor,
  shoppingListId,
  product,
  completedItemsCount,
  totalItemsCount,
}) => {
  if (!editor || !shoppingListId || !product) {
    return FirebaseResponse.type.ERROR;
  }

  const productUpdater = ProductUpdaters.get(
    ProductUpdaters.types.UPDATE_PRODUCT,
  );
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
    console.log('updateProductHandler()->ERROR: ' + error);
    return FirebaseResponse.type.ERROR;
  }

  // Применяем обновление.
  try {
    await database()
      .ref()
      .update(updates);

    return FirebaseResponse.type.SUCCESS;
  } catch (e) {
    console.log('updateProductHandler()->DATABASE_ERROR: ' + e);
    return FirebaseResponse.type.ERROR;
  }
};
