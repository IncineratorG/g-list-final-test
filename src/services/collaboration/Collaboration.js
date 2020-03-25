import {FirebaseCollaboration} from './firabase/FirebaseCollaboration';

export class Collaboration {
  static async userExist({phone}) {
    try {
      const result = await FirebaseCollaboration.checkUserExistence({phone});
      return result === 'EXIST';
    } catch (e) {
      throw new Error(e);
    }
  }

  static async sendMessage({receiverPhone, senderPhone, messageText}) {
    try {
      const result = await FirebaseCollaboration.sendTextMessage({
        receiverPhone,
        senderPhone,
        messageText,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async shareShoppingList({
    receivers,
    sender,
    shoppingList,
    shoppingListCard,
    units,
    classes,
  }) {
    try {
      await FirebaseCollaboration.shareShoppingList({
        receivers,
        sender,
        shoppingList,
        shoppingListCard,
        units,
        classes,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async removeSharedShoppingList({shoppingListId}) {
    try {
      await FirebaseCollaboration.removeSharedShoppingList({shoppingListId});
    } catch (e) {
      throw new Error(e);
    }
  }

  static async updateListTimestamp({editor, shoppingListId}) {
    try {
      await FirebaseCollaboration.updateListTimestamp({editor, shoppingListId});
    } catch (e) {
      throw new Error(e);
    }
  }

  static async setProductStatus({
    editor,
    shoppingListId,
    productId,
    status,
    completedItemsCount,
    totalItemsCount,
  }) {
    try {
      await FirebaseCollaboration.setProductStatus({
        editor,
        shoppingListId,
        productId,
        status,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  static async addProduct({
    editor,
    shoppingListId,
    product,
    completedItemsCount,
    totalItemsCount,
  }) {
    try {
      await FirebaseCollaboration.addProduct({
        editor,
        shoppingListId,
        product,
        completedItemsCount,
        totalItemsCount,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

// const usedUnits = [];
// const usedClasses = [];
// products.map(product => {
//   if (
//     usedUnits.filter(usedUnit => usedUnit.id === product.unitId).length <= 0
//   ) {
//     const unit = units.filter(u => u.id === product.unitId);
//     if (unit.length > 0) {
//       usedUnits.push(unit[0]);
//     }
//   }
//
//   if (
//     usedClasses.filter(usedClass => usedClass.id === product.classId)
//       .length <= 0
//   ) {
//     const cl = classes.filter(c => c.id === product.classId);
//     if (cl.length > 0) {
//       usedClasses.push(cl[0]);
//     }
//   }
// });
