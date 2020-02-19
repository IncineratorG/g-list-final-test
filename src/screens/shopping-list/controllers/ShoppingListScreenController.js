import {
  addProduct,
  setProductStatus,
} from '../../../store/actions/shoppingListActions';

export const useShoppingListScreenController = model => {
  const navigationButtonHandler = () => {
    model.navigation.navigate('Registration');
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
    model.dispatch(setProductStatus(productId, status));
  };

  return {
    addProductButtonHandler,
    inputAreaHideHandler,
    inputAreaSubmitValuesHandler,
    statusPressHandler,
    navigationButtonHandler,
  };
};
