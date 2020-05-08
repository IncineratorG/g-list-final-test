import {useCallback, useMemo} from 'react';
import {
  addProduct,
  removeProduct,
  setProductStatus,
} from '../../../store/actions/shoppingListActions';

export const useShoppingListScreenController = model => {
  const navigationButtonHandler = () => {
    console.log('SIGNED_IN: ' + model.data.signedIn);

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
        editor: model.data.currentId,
        shoppingListId: model.data.shoppingListId,
        name: values.productName,
        quantity: values.quantityValue,
        unitId: values.quantityUnit,
        note: values.note,
        classId: 1,
      }),
    );
  };

  // const statusPressHandler = (productId, status) => {
  //   console.log('statusPressHandler: ' + productId + ' - ' + status);
  //
  //   model.dispatch(
  //     setProductStatus({
  //       editor: model.data.currentId,
  //       shoppingListId: model.data.shoppingListId,
  //       productId,
  //       status,
  //     }),
  //   );
  // };

  const statusPressHandler = useCallback(
    (productId, status) => {
      console.log(
        'statusPressHandler: ' +
          model.data.shoppingListId +
          ' - ' +
          productId +
          ' - ' +
          status,
      );

      model.dispatch(
        setProductStatus({
          editor: model.data.currentId,
          shoppingListId: model.data.shoppingListId,
          productId,
          status,
        }),
      );
    },
    [model],
  );

  //   const statusPressHandler = useCallback(
  // ,
  //     [model],
  //   );

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
        editor: model.data.currentId,
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

  const shadedBackgroundPressHandler = () => {
    model.setters.setInputAreaVisible(!model.data.inputAreaVisible);
  };

  return {
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    navigationButtonHandler,
    productRemoveHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogCancelRemoveHandler,
    shadedBackgroundPressHandler,
  };
};
