import {addProduct} from '../../../store/actions/shoppingListActions';

export const useShoppingListScreenController = model => {
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

  return {
    addProductButtonHandler,
    inputAreaHideHandler,
    inputAreaSubmitValuesHandler,
  };
};
