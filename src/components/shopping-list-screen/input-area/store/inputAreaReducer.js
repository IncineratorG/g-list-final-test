import {icons} from '../../../../assets/icons';
import {
  INITIAL_PRODUCT_NAME,
  INITIAL_QUANTITY_VALUE,
  INITIAL_QUANTITY_UNIT,
  INITIAL_NOTE,
  INPUT_PRODUCT_NAME,
  INPUT_QUANTITY,
  INPUT_NOTE,
  PLACEHOLDER_PRODUCT_NAME,
  PLACEHOLDER_QUANTITY_VALUE,
  PLACEHOLDER_NOTE,
} from './inputAreaTypes';
import {
  HIDE_INPUT_AREA,
  SELECT_PRODUCT_NAME,
  SELECT_QUANTITY,
  SELECT_NOTE,
  CHANGE_TEXT,
  SUBMIT_VALUES,
  SET_UNITS,
  SET_UNIT,
} from './inputAreaActions';

export function reducer(state, action) {
  switch (action.type) {
    // case SHOW_INPUT_AREA: {
    //   return {
    //     ...state,
    //     inputAreaVisible: true,
    //     keyboardType: 'default',
    //     textInputIcon: icons.title,
    //     textInputOptionsVisible: false,
    //     currentInput: INPUT_PRODUCT_NAME,
    //     values: {
    //       acceptable: false,
    //       placeholder: PLACEHOLDER_PRODUCT_NAME,
    //       productName: INITIAL_PRODUCT_NAME,
    //       quantityValue: INITIAL_QUANTITY_VALUE,
    //       quantityUnit: INITIAL_QUANTITY_UNIT,
    //       note: INITIAL_NOTE,
    //     },
    //   };
    // }

    case HIDE_INPUT_AREA: {
      return {
        ...state,
        inputAreaVisible: false,
        keyboardType: 'default',
        textInputIcon: icons.title,
        textInputOptionsVisible: false,
        currentInput: INPUT_PRODUCT_NAME,
        values: {
          ...state.values,
          acceptable: false,
          placeholder: PLACEHOLDER_PRODUCT_NAME,
          productName: INITIAL_PRODUCT_NAME,
          quantityValue: INITIAL_QUANTITY_VALUE,
          quantityUnit: INITIAL_QUANTITY_UNIT,
          note: INITIAL_NOTE,
        },
      };
    }

    case SELECT_PRODUCT_NAME: {
      return {
        ...state,
        keyboardType: 'default',
        textInputIcon: icons.title,
        textInputOptionsVisible: false,
        currentInput: INPUT_PRODUCT_NAME,
        values: {...state.values, placeholder: PLACEHOLDER_PRODUCT_NAME},
      };
    }

    case SELECT_QUANTITY: {
      return {
        ...state,
        keyboardType: 'numeric',
        textInputIcon: icons.weight,
        textInputOptionsVisible: true,
        currentInput: INPUT_QUANTITY,
        values: {...state.values, placeholder: PLACEHOLDER_QUANTITY_VALUE},
      };
    }

    case SELECT_NOTE: {
      return {
        ...state,
        keyboardType: 'default',
        textInputIcon: icons.note,
        textInputOptionsVisible: false,
        currentInput: INPUT_NOTE,
        values: {...state.values, placeholder: PLACEHOLDER_NOTE},
      };
    }

    case CHANGE_TEXT: {
      switch (state.currentInput) {
        case INPUT_PRODUCT_NAME: {
          return {
            ...state,
            values: {
              ...state.values,
              productName: action.payload,
              acceptable: action.payload.length > 0,
            },
          };
        }

        case INPUT_QUANTITY: {
          return {
            ...state,
            values: {...state.values, quantityValue: action.payload},
          };
        }

        case INPUT_NOTE: {
          return {...state, values: {...state.values, note: action.payload}};
        }
      }

      return {...state};
    }

    case SUBMIT_VALUES: {
      return {
        ...state,
        values: {
          ...state.values,
          acceptable: false,
          productName: INITIAL_PRODUCT_NAME,
          quantityValue: INITIAL_QUANTITY_VALUE,
          note: INITIAL_NOTE,
        },
      };
    }

    case SET_UNITS: {
      const units = action.payload ? action.payload : [];
      return {...state, values: {...state.values, units: units}};
    }

    case SET_UNIT: {
      return {
        ...state,
        values: {...state.values, quantityUnit: action.payload},
      };
    }

    default: {
      return state;
    }
  }
}