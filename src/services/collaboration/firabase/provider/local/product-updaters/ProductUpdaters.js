import {FirebasePaths} from '../../../../../storage/firebase-storage/FirebasePaths';

export class ProductUpdaters {
  static get(type) {
    switch (type) {
      case ProductUpdaters.types.ADD_PRODUCT: {
        let strategyData = {
          updates: undefined,
          productPath: undefined,
          product: undefined,
        };
        const addProductStrategy = () => {
          const {updates, productPath, product} = strategyData;
          updates[productPath] = product;
        };

        return {
          run: addProductStrategy,
          data: strategyData,
          type: ProductUpdaters.types.ADD_PRODUCT,
        };
      }

      case ProductUpdaters.types.UPDATE_PRODUCT: {
        let strategyData = {
          updates: undefined,
          productPath: undefined,
          product: undefined,
        };
        const updateProductStrategy = () => {
          const {updates, productPath, product} = strategyData;
          updates[productPath] = product;
        };

        return {
          run: updateProductStrategy,
          data: strategyData,
          type: ProductUpdaters.types.UPDATE_PRODUCT,
        };
      }

      case ProductUpdaters.types.REMOVE_PRODUCT: {
        let strategyData = {updates: undefined, productPath: undefined};
        const removeProductStrategy = () => {
          const {updates, productPath} = strategyData;
          updates[productPath] = null;
        };

        return {
          run: removeProductStrategy,
          data: strategyData,
          type: ProductUpdaters.types.REMOVE_PRODUCT,
        };
      }

      case ProductUpdaters.types.UPDATE_STATUS: {
        let strategyData = {
          updates: undefined,
          productPath: undefined,
          status: undefined,
          updateTimestamp: undefined,
        };
        const updateStatusStrategy = () => {
          const {updates, productPath, status, updateTimestamp} = strategyData;
          updates[
            productPath +
              FirebasePaths.d +
              FirebasePaths.folderNames.COMPLETION_STATUS
          ] = status;
          updates[
            productPath +
              FirebasePaths.d +
              FirebasePaths.folderNames.UPDATE_TIMESTAMP
          ] = updateTimestamp;
        };

        return {
          run: updateStatusStrategy,
          data: strategyData,
          type: ProductUpdaters.types.UPDATE_STATUS,
        };
      }
    }

    return undefined;
  }
}

ProductUpdaters.types = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  UPDATE_STATUS: 'UPDATE_STATUS',
};
