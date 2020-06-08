import {
  CHANGE_TEXT,
  SELECT_CATEGORY,
  SELECT_NOTE,
  SELECT_PRODUCT_NAME,
  SELECT_QUANTITY,
  SET_CLASS,
  SET_UNIT,
  SUBMIT_VALUES,
} from '../store/inputAreaActions';

export const useProductInputAreaViewController = ({model}) => {
  const productNameButtonHandler = () =>
    model.dispatch({type: SELECT_PRODUCT_NAME});
  const quantityButtonHandler = () => model.dispatch({type: SELECT_QUANTITY});
  const noteButtonHandler = () => model.dispatch({type: SELECT_NOTE});
  const categoryButtonHandler = () => model.dispatch({type: SELECT_CATEGORY});

  const changeInputTextHandler = text => {
    model.dispatch({type: CHANGE_TEXT, payload: text});
  };

  const unitsChangeHandler = unitId =>
    model.dispatch({type: SET_UNIT, payload: unitId});

  const categorySelectHandler = category => {
    model.dispatch({type: SET_CLASS, payload: category});
  };

  const submitValues = () => {
    if (!model.data.state.values.acceptable) {
      return;
    }

    const values = {
      productName: model.data.state.values.productName,
      quantityValue: model.data.state.values.quantityValue
        ? model.data.state.values.quantityValue
        : 1,
      quantityUnit: model.data.state.values.quantityUnit,
      note: model.data.state.values.note,
      classId: model.data.state.values.categoryId
        ? model.data.state.values.categoryId
        : 1,
    };

    if (model.externalHandlers.onSubmitValues) {
      model.externalHandlers.onSubmitValues(values);
    }

    model.dispatch({type: SUBMIT_VALUES});
    productNameButtonHandler();
  };
  const acceptInputButtonHandler = () => submitValues();
  const submitEditingHandler = () => submitValues();

  const addCategoryButtonHandler = () => {
    console.log('addCategoryButtonHandler()');
    model.setters.setSelectCategoryColorMode(
      !model.data.selectCategoryColorMode,
    );
    model.externalHandlers.onShowSelectColorDialog();
    // model.setters.setCategoriesColorsDialogVisible(
    //   !model.data.categoriesColorsDialogVisible,
    // );
  };

  return {
    productNameButtonHandler,
    quantityButtonHandler,
    noteButtonHandler,
    categoryButtonHandler,
    changeInputTextHandler,
    unitsChangeHandler,
    categorySelectHandler,
    submitValues,
    acceptInputButtonHandler,
    submitEditingHandler,
    addCategoryButtonHandler,
  };
};
