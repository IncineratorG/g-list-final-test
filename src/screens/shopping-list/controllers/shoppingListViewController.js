import {useCallback} from 'react';
import {
  addProduct,
  removeProduct,
  setProductStatus,
  updateProduct,
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
    model.setters.setInputAreaEditMode(false);
    model.setters.setInputAreaEditModeData(undefined);
    model.setters.setInputAreaVisible(true);
  };

  const inputAreaHideHandler = () => {
    model.setters.setInputAreaVisible(false);
  };

  const inputAreaSubmitValuesHandler = values => {
    if (model.data.inputAreaEditMode) {
      model.dispatch(
        updateProduct({
          editor: model.data.currentId,
          shoppingListId: model.data.shoppingListId,
          productId: model.data.inputAreaEditModeData.id,
          name: values.productName,
          quantity: values.quantityValue,
          unitId: values.quantityUnit,
          note: values.note,
          classId: values.classId,
          status: model.data.inputAreaEditModeData.completionStatus,
        }),
      );
      model.setters.setInputAreaVisible(false);
    } else {
      model.dispatch(
        addProduct({
          editor: model.data.currentId,
          shoppingListId: model.data.shoppingListId,
          name: values.productName,
          quantity: values.quantityValue,
          unitId: values.quantityUnit,
          note: values.note,
          classId: values.classId,
        }),
      );
    }
  };

  const productPressHandler = useCallback(
    product => {
      model.setters.setInputAreaEditMode(true);
      model.setters.setInputAreaEditModeData(product);
      model.setters.setInputAreaVisible(true);
    },
    [model.setters],
  );

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

  const productRemoveHandler = product => {
    model.setters.setRemoveProductName(product.name);
    model.setters.setRemoveProductId(product.id);
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
  };

  const removeConfirmationDialogCancelRemoveHandler = () => {
    model.setters.setRemoveConfirmationDialogVisible(false);
  };

  const shadedBackgroundPressHandler = () => {
    model.setters.setInputAreaVisible(!model.data.inputAreaVisible);
  };

  const selectCategoryHandler = category => {
    model.setters.setSelectedProductClass(category.id);
  };

  return {
    addProductButtonHandler,
    inputAreaSubmitValuesHandler,
    inputAreaHideHandler,
    statusPressHandler,
    productPressHandler,
    navigationButtonHandler,
    productRemoveHandler,
    removeConfirmationDialogRemoveHandler,
    removeConfirmationDialogTouchOutsideHandler,
    removeConfirmationDialogCancelRemoveHandler,
    shadedBackgroundPressHandler,
    selectCategoryHandler,
  };
};
