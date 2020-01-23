import {icons} from '../../../../assets/icons';
import {
  INPUT_PRODUCT_NAME,
  INITIAL_PRODUCT_NAME,
  INITIAL_QUANTITY_VALUE,
  INITIAL_QUANTITY_UNIT,
  INITIAL_NOTE,
  PLACEHOLDER_PRODUCT_NAME,
} from './inputAreaTypes';

export const initialState = {
  inputAreaVisible: false,
  keyboardType: 'default',
  textInputIcon: icons.title,
  textInputOptionsVisible: false,
  currentInput: INPUT_PRODUCT_NAME,
  values: {
    units: [],
    acceptable: false,
    placeholder: PLACEHOLDER_PRODUCT_NAME,
    productName: INITIAL_PRODUCT_NAME,
    quantityValue: INITIAL_QUANTITY_VALUE,
    quantityUnit: INITIAL_QUANTITY_UNIT,
    note: INITIAL_NOTE,
  },
};