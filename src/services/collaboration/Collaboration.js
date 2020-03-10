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
    receiver,
    sender,
    shoppingList,
    units,
    classes,
  }) {
    // const {products} = shoppingList;
    //
    // const usedUnitsIds = [];
    // const usedClassesIds = [];
    // products.map(product => {
    //   if (usedUnitsIds.indexOf(product.unitId) < 0) {
    //     usedUnitsIds.push(product.unitId);
    //   }
    //   if (usedClassesIds.indexOf(product.classId) < 0) {
    //     usedClassesIds.push(product.classId);
    //   }
    // });
    //
    // const usedUnits = units.filter(unit => usedUnitsIds.indexOf(unit.id) >= 0);
    // const usedClasses = classes.filter(
    //   cl => usedClassesIds.indexOf(cl.id) >= 0,
    // );

    try {
      await FirebaseCollaboration.shareShoppingList({
        receiver,
        sender,
        shoppingList,
        units,
        classes,
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
