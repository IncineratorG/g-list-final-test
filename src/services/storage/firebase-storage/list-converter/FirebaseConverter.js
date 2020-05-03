export class FirebaseConverter {
  static listFromFirebase({
    shoppingListId,
    shoppingListCardSnapshot,
    receiversSnapshot,
    productsSnapshot,
  }) {
    const shoppingList = this.cardFromFirebase({
      shoppingListId,
      shoppingListCardSnapshot,
      receiversSnapshot,
    });
    shoppingList.productsList = this.productsFromFirebase_V2(productsSnapshot);

    return shoppingList;
  }

  static cardFromFirebase({
    shoppingListId,
    shoppingListCardSnapshot,
    receiversSnapshot,
  }) {
    const {
      name,
      creator,
      totalItemsCount,
      completedItemsCount,
      createTimestamp,
      updateTimestamp,
    } = shoppingListCardSnapshot.val();

    const receivers = [];
    if (receiversSnapshot) {
      receiversSnapshot.forEach(child => {
        receivers.push(child.val());
      });
    }

    return {
      id: shoppingListId,
      name,
      creator,
      receivers,
      totalItemsCount,
      completedItemsCount,
      createTimestamp,
      updateTimestamp,
      shared: true,
    };
  }

  static productsFromFirebase_V2(productsSnapshot) {
    const productsList = [];
    if (productsSnapshot.val() === null) {
      return productsList;
    }

    productsSnapshot.forEach(child => {
      const product = child.val();

      productsList.push({
        id: product.id,
        parentId: product.shoppingListId,
        name: product.name,
        unitId: product.unitId,
        quantity: product.quantity,
        classId: product.classId,
        note: product.note,
        completionStatus: product.completionStatus,
        createTimestamp: product.createTimestamp,
        updateTimestamp: product.updateTimestamp,
      });
    });

    return productsList;
  }

  static unitsFromFirebase(unitsSnapshot) {
    return unitsSnapshot.map(unitSnapshot => {
      return {id: unitSnapshot.id, name: unitSnapshot.name};
    });
  }

  static classesFromFirebase(classesSnapshot) {
    return classesSnapshot.map(classSnapshot => {
      return {id: classSnapshot.id, name: classSnapshot.name};
    });
  }

  // static listFromFirebase(shoppingListSnapshot) {
  //   if (shoppingListSnapshot.val() === null) {
  //     return undefined;
  //   }
  //
  //   const units = this.unitsFromFirebase(shoppingListSnapshot.val().units);
  //   const classes = this.classesFromFirebase(
  //     shoppingListSnapshot.val().classes,
  //   );
  //
  //   const shoppingListData = shoppingListSnapshot.val().shoppingList;
  //
  //   const id = shoppingListSnapshot.key;
  //   const {
  //     name,
  //     creator,
  //     totalItemsCount,
  //     completedItemsCount,
  //     createTimestamp,
  //     updateTimestamp,
  //   } = shoppingListData;
  //
  //   const productsList = this.productsFromFirebase(
  //     shoppingListData.productsList,
  //     id,
  //   );
  //
  //   const shoppingList = {
  //     id,
  //     name,
  //     creator,
  //     totalItemsCount,
  //     completedItemsCount,
  //     createTimestamp,
  //     updateTimestamp,
  //     shared: true,
  //     productsList,
  //   };
  //
  //   return {shoppingList, units, classes};
  // }

  // static productsFromFirebase(productsSnapshot, shoppingListId) {
  //   if (!productsSnapshot) {
  //     return [];
  //   }
  //
  //   return productsSnapshot.map(productSnapshot => {
  //     return {
  //       id: productSnapshot.id,
  //       parentId: shoppingListId,
  //       name: productSnapshot.name,
  //       unitId: productSnapshot.unitId,
  //       quantity: productSnapshot.quantity,
  //       classId: productSnapshot.classId,
  //       note: productSnapshot.note,
  //       completionStatus: productSnapshot.completionStatus,
  //       createTimestamp: productSnapshot.createTimestamp,
  //       updateTimestamp: productSnapshot.updateTimestamp,
  //     };
  //   });
  // }
}
