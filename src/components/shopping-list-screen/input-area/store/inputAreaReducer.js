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
  INPUT_CATEGORY,
  PLACEHOLDER_CATEGORY,
  INITIAL_CATEGORY_ID,
  INITIAL_CATEGORY,
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
  SELECT_CATEGORY,
  SET_CLASSES,
  SET_CLASS,
  SET_EDIT_PRODUCT,
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
        categoriesVisible: false,
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

    case SET_EDIT_PRODUCT: {
      const getClassDescription = classId => {
        const filteredClasses = state.values.classes.filter(
          cl => cl.id === classId,
        );
        return filteredClasses.length ? filteredClasses[0] : undefined;
      };

      const classDesc = getClassDescription(action.payload.classId);

      return {
        ...state,
        values: {
          ...state.values,
          acceptable: true,
          productName: action.payload.name,
          category: classDesc ? classDesc.name : '',
          categoryId: classDesc ? classDesc.id : '',
          quantityValue: action.payload.quantity.toString(),
          quantityUnit: action.payload.unitId,
          note: action.payload.note,
        },
      };
    }

    case SELECT_PRODUCT_NAME: {
      return {
        ...state,
        keyboardType: 'default',
        textInputIcon: icons.title,
        textInputOptionsVisible: false,
        categoriesVisible: false,
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
        categoriesVisible: false,
        currentInput: INPUT_QUANTITY,
        values: {...state.values, placeholder: PLACEHOLDER_QUANTITY_VALUE},
      };
    }

    case SELECT_CATEGORY: {
      console.log('SELECT_CATEGORY');

      return {
        ...state,
        keyboardType: 'default',
        textInputIcon: icons.category,
        currentInput: INPUT_CATEGORY,
        textInputOptionsVisible: false,
        categoriesVisible: true,
        values: {
          ...state.values,
          placeholder: PLACEHOLDER_CATEGORY,
        },
      };
    }

    case SELECT_NOTE: {
      return {
        ...state,
        keyboardType: 'default',
        textInputIcon: icons.note,
        textInputOptionsVisible: false,
        categoriesVisible: false,
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

        case INPUT_CATEGORY: {
          let categoryId;
          if (state.values.classesMap.has(action.payload)) {
            categoryId = state.values.classesMap.get(action.payload).id;
          }

          return {
            ...state,
            values: {
              ...state.values,
              category: action.payload,
              categoryId: categoryId ? categoryId : INITIAL_CATEGORY_ID,
            },
          };
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
          category: INITIAL_CATEGORY,
          categoryId: INITIAL_CATEGORY_ID,
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

    case SET_CLASSES: {
      const classes = action.payload ? action.payload : [];
      const classesMap = new Map();
      classes.forEach(cl => classesMap.set(cl.name, cl));

      return {
        ...state,
        values: {...state.values, classes: classes, classesMap: classesMap},
      };
    }

    case SET_CLASS: {
      return {
        ...state,
        values: {
          ...state.values,
          categoryId: action.payload.id,
          category: action.payload.name,
        },
      };
    }

    default: {
      return state;
    }
  }
}
