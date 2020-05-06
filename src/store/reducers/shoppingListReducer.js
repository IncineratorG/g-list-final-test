import {
  ADD_PRODUCT,
  ADD_PRODUCTS,
  CREATE_SHOPPING_LIST,
  DELETE_PRODUCTS,
  LOAD_CLASSES,
  LOAD_UNITS,
  REMOVE_PRODUCT_BEGIN,
  REMOVE_PRODUCT_ERROR,
  REMOVE_PRODUCT_FINISHED,
  REMOVE_SHOPPING_LIST_BEGIN,
  REMOVE_SHOPPING_LIST_ERROR,
  REMOVE_SHOPPING_LIST_FINISHED,
  SET_PRODUCT_STATUS_BEGIN,
  SET_PRODUCT_STATUS_ERROR,
  SET_PRODUCT_STATUS_FINISHED,
  SET_RECEIVED_LISTS_LOADING,
  SET_SEND_LISTS_LOADING,
  SET_SHARED_LIST_LOADING,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR,
  SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED,
  SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
  SUBSCRIBE_TO_SHARED_SHOPPING_LIST_LOADING_STATUS,
  SUBSCRIBE_TO_SHOPPING_LIST_BEGIN,
  SUBSCRIBE_TO_SHOPPING_LIST_ERROR,
  SUBSCRIBE_TO_SHOPPING_LIST_FINISHED,
  UNSUBSCRIBE_FROM_LIST_OF_SHOPPING_LISTS,
  UNSUBSCRIBE_FROM_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS,
  UPDATE_LIST_OF_SHOPPING_LISTS,
  UPDATE_PRODUCTS,
  UPDATE_SHOPPING_LIST,
} from '../types/shoppingListTypes';

const initialState = {
  units: [],
  classes: [],
  allShoppingLists: {
    unsubscribeHandler: undefined,
    sharedListsLoadingStatusUnsubscribeHandlers: [],
    sendListsLoading: true,
    receivedListsLoading: true,
    sharedListsLoading: true,
    localListsLoading: true,
    removing: false,
    error: '',
    data: [],
    sharedLists: [],
    localLists: [],
  },
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

export const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHOPPING_LIST: {
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

    case REMOVE_SHOPPING_LIST_BEGIN: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: true,
        },
      };
    }

    case REMOVE_SHOPPING_LIST_FINISHED: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: false,
        },
      };
    }

    case REMOVE_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          removing: false,
        },
      };
    }

    case LOAD_UNITS: {
      return {...state, units: action.payload};
    }

    case LOAD_CLASSES: {
      return {...state, classes: action.payload};
    }

    case ADD_PRODUCT: {
      return {...state};
    }

    case SET_PRODUCT_STATUS_BEGIN: {
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

    case SET_PRODUCT_STATUS_FINISHED: {
      return {...state};
    }

    case SET_PRODUCT_STATUS_ERROR: {
      console.log('SET_PRODUCT_STATUS_ERROR');
      return {...state};
    }

    case REMOVE_PRODUCT_BEGIN: {
      return {...state};
    }

    case REMOVE_PRODUCT_FINISHED: {
      return {...state};
    }

    case REMOVE_PRODUCT_ERROR: {
      return {...state};
    }

    case SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_BEGIN: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          localListsLoading: true,
          receivedListsLoading: true,
          sendListsLoading: true,
          error: '',
          unsubscribeHandler: undefined,
        },
      };
    }

    case SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_FINISHED: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      let sharedLists = [];
      let localLists = [];
      action.payload.listOfShoppingLists.forEach(list => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      sharedLists = sharedLists.sort(
        (l1, l2) => l1.createTimestamp < l2.createTimestamp,
      );
      localLists = localLists.sort(
        (l1, l2) => l1.createTimestamp < l2.createTimestamp,
      );

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          localListsLoading: false,
          error: '',
          unsubscribeHandler: action.payload.unsubscribe,
          data: [...action.payload.listOfShoppingLists],
          sharedLists: [...sharedLists],
          localLists: [...localLists],
        },
      };
    }

    case SUBSCRIBE_TO_LIST_OF_SHOPPING_LISTS_ERROR: {
      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          localListsLoading: false,
          error: action.payload ? action.payload : '',
          data: [],
        },
      };
    }

    case UPDATE_LIST_OF_SHOPPING_LISTS: {
      console.log('UPDATE_LIST_OF_SHOPPING_LISTS');

      let sharedLists = [];
      let localLists = [];
      action.payload.forEach(list => {
        if (list.shared) {
          sharedLists.push(list);
        } else {
          localLists.push(list);
        }
      });

      sharedLists = sharedLists.sort(
        (l1, l2) => l1.createTimestamp < l2.createTimestamp,
      );
      localLists = localLists.sort(
        (l1, l2) => l1.createTimestamp < l2.createTimestamp,
      );

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          data: [...action.payload],
          sharedLists: [...sharedLists],
          localLists: [...localLists],
        },
      };
    }

    case UNSUBSCRIBE_FROM_LIST_OF_SHOPPING_LISTS: {
      if (state.allShoppingLists.unsubscribeHandler) {
        state.allShoppingLists.unsubscribeHandler();
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          unsubscribeHandler: undefined,
        },
      };
    }

    case SUBSCRIBE_TO_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS: {
      if (state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers) {
        state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers.forEach(
          unsubscribeFunc => {
            unsubscribeFunc();
          },
        );
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          sharedListsLoadingStatusUnsubscribeHandlers: [
            ...action.payload.unsubscribeHandlers,
          ],
        },
      };
    }

    case SET_SEND_LISTS_LOADING: {
      const receivedListsLoading = state.allShoppingLists.receivedListsLoading;
      const sendListsLoading = action.payload;
      const sharedListsLoading = receivedListsLoading || sendListsLoading;

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          sendListsLoading: action.payload,
          sharedListsLoading: sharedListsLoading,
        },
      };
    }

    case SET_RECEIVED_LISTS_LOADING: {
      const receivedListsLoading = state.allShoppingLists.receivedListsLoading;
      const sendListsLoading = action.payload;
      const sharedListsLoading = receivedListsLoading || sendListsLoading;

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          receivedListsLoading: action.payload,
          sharedListsLoading: sharedListsLoading,
        },
      };
    }

    case UNSUBSCRIBE_FROM_SHARED_LISTS_OF_SHOPPING_LISTS_LOADING_STATUS: {
      if (state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers) {
        state.allShoppingLists.sharedListsLoadingStatusUnsubscribeHandlers.forEach(
          unsubscribeFunc => {
            unsubscribeFunc();
          },
        );
      }

      return {
        ...state,
        allShoppingLists: {
          ...state.allShoppingLists,
          sharedListsLoadingStatusUnsubscribeHandlers: [],
        },
      };
    }

    // ===
    case ADD_PRODUCTS: {
      const shoppingListId = action.payload.shoppingListId;
      const products = action.payload.products;

      console.log('ADD_PRODUCT');

      if (shoppingListId !== state.currentShoppingList.id) {
        return {...state};
      }

      const newProducts = [
        ...state.currentShoppingList.products,
        ...products,
      ].sort((p1, p2) => p1.createTimestamp < p2.createTimestamp);

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: [...newProducts],
        },
      };
    }

    case UPDATE_PRODUCTS: {
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
        .sort((p1, p2) => p1.createTimestamp < p2.createTimestamp);

      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          products: [...updatedProducts],
        },
      };
    }

    case DELETE_PRODUCTS: {
      const shoppingListId = action.payload.shoppingListId;
      const products = action.payload.products;

      console.log(
        'DELETE_PRODUCTS_REDUCER: ' + shoppingListId + ' - ' + products.length,
      );
      return {...state};
    }
    // ===

    case SUBSCRIBE_TO_SHOPPING_LIST_BEGIN: {
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

    case SUBSCRIBE_TO_SHOPPING_LIST_FINISHED: {
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
            (p1, p2) => p1.createTimestamp < p2.createTimestamp,
          ),
          receivers: action.payload.shoppingList.receivers
            ? [...action.payload.shoppingList.receivers]
            : [],
        },
      };
    }

    case SUBSCRIBE_TO_SHOPPING_LIST_ERROR: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          localListLoading: false,
          error: action.payload ? action.payload : '',
        },
      };
    }

    case UPDATE_SHOPPING_LIST: {
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

    case SUBSCRIBE_TO_SHARED_SHOPPING_LIST_LOADING_STATUS: {
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

    case SET_SHARED_LIST_LOADING: {
      return {
        ...state,
        currentShoppingList: {
          ...state.currentShoppingList,
          sharedListLoading: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
