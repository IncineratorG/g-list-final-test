import {
  CSL_ADD_PRODUCT,
  CSL_ADD_PRODUCTS,
  CSL_CREATE_SHOPPING_LIST,
  CSL_DELETE_PRODUCTS,
  CSL_LOAD_CLASSES,
  CSL_LOAD_UNITS,
  CSL_REMOVE_PRODUCT_BEGIN,
  CSL_REMOVE_PRODUCT_ERROR,
  CSL_REMOVE_PRODUCT_FINISHED,
  CSL_SET_PRODUCT_STATUS_BEGIN,
  CSL_SET_PRODUCT_STATUS_ERROR,
  CSL_SET_PRODUCT_STATUS_FINISHED,
  CSL_SET_SHARED_LIST_LOADING,
  CSL_SUBSCRIBE_TO_SHARED_SHOPPING_LIST_LOADING_STATUS,
  CSL_SUBSCRIBE_TO_SHOPPING_LIST_BEGIN,
  CSL_SUBSCRIBE_TO_SHOPPING_LIST_ERROR,
  CSL_SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
  CSL_UPDATE_PRODUCT,
  CSL_UPDATE_PRODUCTS,
  CSL_UPDATE_SHOPPING_LIST,
} from '../types/currentShoppingListTypes';
import {productsComparator} from '../helpers/productsComparator';

const initialState = {
  units: [],
  unitsMap: new Map(),
  classes: [],
  classesMap: new Map(),
  currentShoppingList: {
    unsubscribeHandler: undefined,
    addProductsUnsubscribeHandler: undefined,
    deleteProductsUnsubscribeHandler: undefined,
    updateProductsUnsubscribeHandler: undefined,
    shoppingListChangedUnsubscribeHandler: undefined,
    sharedListLoadingStatusUnsubscribeHandlers: [],
    localListLoading: true,
    sharedListLoading: true,
    error: '',
    id: undefined,
    name: '',
    shared: false,
    creator: '',
    receivers: [],
    products: [],
  },
};

export const currentShoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CSL_LOAD_UNITS: {
      const units = [...action.payload];
      const unitsMap = new Map();

      units.forEach(u => unitsMap.set(u.id, u));

      return {
        ...state,
        units: units,
        unitsMap: unitsMap,
      };
    }

    case CSL_LOAD_CLASSES: {
      const classes = [...action.payload];
      const classesMap = new Map();

      classes.forEach(cl => classesMap.set(cl.id, cl));

      return {
        ...state,
        classes: classes,
        classesMap: classesMap,
      };
    }

    case CSL_SUBSCRIBE_TO_SHOPPING_LIST_BEGIN: {
      if (state.currentShoppingList.addProductsUnsubscribeHandler) {
        state.currentShoppingList.addProductsUnsubscribeHandler();
      }
      if (state.currentShoppingList.updateProductsUnsubscribeHandler) {
        state.currentShoppingList.updateProductsUnsubscribeHandler();
      }
      if (state.currentShoppingList.deleteProductsUnsubscribeHandler) {
        state.currentShoppingList.deleteProductsUnsubscribeHandler();
      }
      if (state.currentShoppingList.shoppingListChangedUnsubscribeHandler) {
        state.currentShoppingList.shoppingListChangedUnsubscribeHandler();
      }

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          addProductsUnsubscribeHandler: undefined,
          updateProductsUnsubscribeHandler: undefined,
          deleteProductsUnsubscribeHandler: undefined,
          shoppingListChangedUnsubscribeHandler: undefined,
          localListsLoading: true,
          error: '',
          id: undefined,
        },
      };
    }

    case CSL_SUBSCRIBE_TO_SHOPPING_LIST_FINISHED: {
      if (state.currentShoppingList.addProductsUnsubscribeHandler) {
        state.currentShoppingList.addProductsUnsubscribeHandler();
      }
      if (state.currentShoppingList.updateProductsUnsubscribeHandler) {
        state.currentShoppingList.updateProductsUnsubscribeHandler();
      }
      if (state.currentShoppingList.deleteProductsUnsubscribeHandler) {
        state.currentShoppingList.deleteProductsUnsubscribeHandler();
      }
      if (state.currentShoppingList.shoppingListChangedUnsubscribeHandler) {
        state.currentShoppingList.shoppingListChangedUnsubscribeHandler();
      }

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          addProductsUnsubscribeHandler:
            action.payload.productsAddedUnsubscribe,
          updateProductsUnsubscribeHandler:
            action.payload.productsUpdatedUnsubscribe,
          deleteProductsUnsubscribeHandler:
            action.payload.productsDeletedUnsubscribe,
          shoppingListChangedUnsubscribeHandler:
            action.payload.shoppingListChangeUnsubscribe,
          localListLoading: false,
          error: '',
          id: action.payload.shoppingList.id,
          name: action.payload.shoppingList.name,
          shared: action.payload.shoppingList.shared ? true : false,
          creator: action.payload.shoppingList.creator
            ? action.payload.shoppingList.creator
            : '',
          products: [...action.payload.shoppingList.productsList].sort(
            productsComparator,
          ),
          // products: [...action.payload.shoppingList.productsList].sort(
          //   (p1, p2) => p1.createTimestamp < p2.createTimestamp,
          // ),
          receivers: action.payload.shoppingList.receivers
            ? [...action.payload.shoppingList.receivers]
            : [],
        },
      };
    }

    case CSL_SUBSCRIBE_TO_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          localListLoading: false,
          error: action.payload ? action.payload : '',
        },
      };
    }

    case CSL_UPDATE_SHOPPING_LIST: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          id: action.payload.shoppingList.id,
          name: action.payload.shoppingList.name,
          shared: action.payload.shoppingList.shared ? true : false,
          creator: action.payload.shoppingList.creator
            ? action.payload.shoppingList.creator
            : '',
          products: [...action.payload.shoppingList.productsList],
          receivers: action.payload.shoppingList.receivers
            ? [...action.payload.shoppingList.receivers]
            : [],
        },
      };
    }

    case CSL_SUBSCRIBE_TO_SHARED_SHOPPING_LIST_LOADING_STATUS: {
      if (
        state.currentShoppingList.sharedListLoadingStatusUnsubscribeHandlers
      ) {
        state.currentShoppingList.sharedListLoadingStatusUnsubscribeHandlers.forEach(
          unsubscribeFunc => {
            unsubscribeFunc();
          },
        );
      }

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          sharedListLoadingStatusUnsubscribeHandlers: [
            ...action.payload.unsubscribeHandlers,
          ],
        },
      };
    }

    case CSL_SET_SHARED_LIST_LOADING: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          sharedListLoading: action.payload,
        },
      };
    }

    case CSL_CREATE_SHOPPING_LIST: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          id: action.payload.shoppingListId,
          name: action.payload.name,
          products: [],
          receivers: [],
        },
      };
    }

    case CSL_ADD_PRODUCT: {
      return state;
    }

    case CSL_ADD_PRODUCTS: {
      const shoppingListId = action.payload.shoppingListId;
      const products = action.payload.products;

      console.log('ADD_PRODUCT');

      if (shoppingListId !== state.currentShoppingList.id) {
        return {...state};
      }

      const newProducts = [
        ...state.currentShoppingList.products,
        ...products,
      ].sort(productsComparator);

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: newProducts,
        },
      };
    }

    case CSL_UPDATE_PRODUCT: {
      return state;
    }

    case CSL_UPDATE_PRODUCTS: {
      const shoppingListId = action.payload.shoppingListId;
      const products = action.payload.products;

      console.log('UPDATE_PRODUCTS');

      if (shoppingListId !== state.currentShoppingList.id) {
        return {...state};
      }

      const updatedProductsMap = new Map(
        products.map(product => [product.id, product]),
      );

      let updatedProducts = state.currentShoppingList.products
        .map(product => {
          return updatedProductsMap.has(product.id)
            ? updatedProductsMap.get(product.id)
            : product;
        })
        .sort(productsComparator);

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: updatedProducts,
        },
      };
    }

    case CSL_SET_PRODUCT_STATUS_BEGIN: {
      const shoppingListId = action.payload.shoppingListId;
      const productId = action.payload.productId;
      const newStatus = action.payload.status;

      if (state.currentShoppingList.id !== shoppingListId) {
        return {...state};
      }

      const updatedProducts = state.currentShoppingList.products.map(
        product => {
          let updatedProduct = {...product};
          if (updatedProduct.id === productId) {
            // console.log('SET_PRODUCT_STATUS_BEGIN: ' + updatedProduct.completionStatus + ' - ' + newStatus);
            updatedProduct.completionStatus = newStatus;
          }
          return updatedProduct;
        },
      );

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: [...updatedProducts],
        },
      };
    }

    case CSL_SET_PRODUCT_STATUS_FINISHED: {
      return state;
    }

    case CSL_SET_PRODUCT_STATUS_ERROR: {
      console.log('SET_PRODUCT_STATUS_ERROR');
      return state;
    }

    case CSL_REMOVE_PRODUCT_BEGIN: {
      return state;
    }

    case CSL_REMOVE_PRODUCT_FINISHED: {
      return state;
    }

    case CSL_REMOVE_PRODUCT_ERROR: {
      return state;
    }

    case CSL_DELETE_PRODUCTS: {
      const shoppingListId = action.payload.shoppingListId;
      const products = action.payload.products;

      console.log('DELETE_PRODUCTS');

      const deletedProductsIdsSet = new Set();
      products.forEach(product => deletedProductsIdsSet.add(product.id));

      if (shoppingListId !== state.currentShoppingList.id) {
        return {...state};
      }

      const updatedProducts = state.currentShoppingList.products.filter(
        product => !deletedProductsIdsSet.has(product.id),
      );

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: updatedProducts,
        },
      };
    }

    default: {
      return state;
    }
  }
};
