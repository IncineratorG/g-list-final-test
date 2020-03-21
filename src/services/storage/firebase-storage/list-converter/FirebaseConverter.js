export class FirebaseConverter {
  static cardFromFirebase(shoppingListId, shoppingListCardSnapshot) {
    const {
      name,
      creator,
      totalItemsCount,
      completedItemsCount,
      createTimestamp,
      updateTimestamp,
    } = shoppingListCardSnapshot.val();

    return {
      id: shoppingListId,
      name,
      creator,
      totalItemsCount,
      completedItemsCount,
      createTimestamp,
      updateTimestamp,
      shared: true,
    };
  }

  static listFromFirebase(shoppingListSnapshot) {
    if (shoppingListSnapshot.val() === null) {
      return undefined;
    }

    const units = this.unitsFromFirebase(shoppingListSnapshot.val().units);
    const classes = this.classesFromFirebase(
      shoppingListSnapshot.val().classes,
    );

    const shoppingListData = shoppingListSnapshot.val().shoppingList;

    const id = shoppingListSnapshot.key;
    const {
      name,
      creator,
      totalItemsCount,
      completedItemsCount,
      createTimestamp,
      updateTimestamp,
    } = shoppingListData;

    const productsList = this.productsFromFirebase(
      shoppingListData.productsList,
      id,
    );

    const shoppingList = {
      id,
      name,
      creator,
      totalItemsCount,
      completedItemsCount,
      createTimestamp,
      updateTimestamp,
      shared: true,
      productsList,
    };

    return {shoppingList, units, classes};
  }

  static productsFromFirebase(productsSnapshot, shoppingListId) {
    if (!productsSnapshot) {
      return [];
    }

    return productsSnapshot.map(productSnapshot => {
      return {
        id: productSnapshot.id,
        parentId: shoppingListId,
        name: productSnapshot.name,
        unitId: productSnapshot.unitId,
        quantity: productSnapshot.quantity,
        classId: productSnapshot.classId,
        note: productSnapshot.note,
        completionStatus: productSnapshot.completionStatus,
        createTimestamp: productSnapshot.createTimestamp,
        updateTimestamp: productSnapshot.updateTimestamp,
      };
    });
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
}
