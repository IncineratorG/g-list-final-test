import {PRODUCT_COMPLETED} from '../../../services/storage/data/productStatus';

export class CollaboratorsHelper {
  static listToText({shoppingList, classesMap, unitsMap}) {
    if (!shoppingList || !classesMap || !unitsMap) {
      console.log('CollaboratorsHelper->listToText(): BAD_INPUT');
      return '';
    }

    const groupBy = (objectArray, property) => {
      const reduced = objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
      }, {});

      let arr = [];
      for (let [key, value] of Object.entries(reduced)) {
        // arr = arr.concat(value);
        arr.push(...value);
      }

      return arr;
    };

    const listName = shoppingList.name;

    let listString = listName + '\n';

    if (!shoppingList.products) {
      return listString;
    }

    let products = [...shoppingList.products];
    products = groupBy(products, 'classId');

    let productsStringsArr = [];
    let counter = 1;

    for (let i = 0; i < products.length; ++i) {
      const product = products[i];
      if (product.completionStatus === PRODUCT_COMPLETED) {
        continue;
      }

      const productName = product.name;
      const category = classesMap.get(product.classId).name;
      const quantity = product.quantity;
      const unit = unitsMap.get(product.unitId).name;
      const note = product.note;

      const noteString = note ? '(' + note + ')' : '';

      const productDescription =
        counter.toString() +
        '. ' +
        category +
        ' - ' +
        productName +
        ' ' +
        quantity.toString() +
        ' ' +
        unit +
        ' ' +
        noteString;

      productsStringsArr.push(productDescription + '\n');

      ++counter;
    }

    listString = listString + productsStringsArr.join('');

    return listString;
  }
}
