import {PRODUCT_COMPLETED} from '../../../services/storage/data/productStatus';

export class CollaboratorsHelper {
  static listToText({shoppingList, classesMap, unitsMap}) {
    if (!shoppingList || !classesMap || !unitsMap) {
      console.log('CollaboratorsHelper->listToText(): BAD_INPUT');
      return '';
    }

    const listName = shoppingList.name;

    let listString = listName + '\n';

    let productsArr = [];
    let counter = 1;

    for (let i = 0; i < shoppingList.products.length; ++i) {
      const product = shoppingList.products[i];
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
        ' ' +
        productName +
        ' ' +
        quantity.toString() +
        ' ' +
        unit +
        ' ' +
        noteString;

      productsArr.push(productDescription + '\n');

      ++counter;
    }

    listString = listString + productsArr.join('');

    return listString;
  }
}
