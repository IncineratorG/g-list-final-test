import {
  addProduct,
  removeProduct,
  removeShoppingList,
  setProductStatus,
} from '../../../store/actions/shoppingListActions';

export const useShoppingListScreenController = model => {
  const navigationButtonHandler = () => {
    if (model.data.signedIn) {
      model.navigation.navigate('Collaborators');
    } else {
      model.navigation.navigate('Authentication', {
        destinationScreen: 'Collaborators',
      });
    }
  };

  const addProductButtonHandler = () => {
    model.setters.setInputAreaVisible(true);
  };

  const inputAreaHideHandler = () => {
    model.setters.setInputAreaVisible(false);
  };

  const inputAreaSubmitValuesHandler = values => {
    model.dispatch(
      addProduct({
        editor: model.data.currentPhone,
        shoppingListId: model.data.shoppingListId,
        name: values.productName,
        quantity: values.quantityValue,
        unitId: values.quantityUnit,
        note: values.note,
        classId: 1,
      }),
    );
  };

  const statusPressHandler = (productId, status) => {
    model.dispatch(
      setProductStatus({
        editor: model.data.currentPhone,
        shoppingListId: model.data.shoppingListId,
        productId,
        status,
      }),
    );
  };

  const productRemoveHandler = (product, row) => {
    model.setters.setRemoveProductName(product.name);
    model.setters.setRemoveProductId(product.id);
    model.setters.setProductRow(row);
    model.setters.setRemoveConfirmationDialogVisible(true);
  };

  const removeConfirmationDialogTouchOutsideHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
  };

  const removeConfirmationDialogRemoveHandler = () => {
    model.dispatch(
      removeProduct({
        editor: model.data.currentPhone,
        shoppingListId: model.data.shoppingListId,
        productId: model.data.removeProductId,
      }),
    );
    model.setters.setRemoveConfirmationDialogVisible(false);
    model.setters.setProductRow(null);
  };

  const removeConfirmationDialogCancelRemoveHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
    model.data.productRow.closeRow();
    model.setters.setProductRow(null);
  };

  return {
    addProductButtonHandler,
    inputAreaHideHandler,
    inputAreaSubmitValuesHandler,
    statusPressHandler,
    navigationButtonHandler,
    productRemoveHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogCancelRemoveHandler,
  };
};
