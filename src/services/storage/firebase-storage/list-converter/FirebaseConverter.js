export class FirebaseConverter {
  static listFromFirebase(shoppingListSnapshot) {
    const units = this.unitsFromFirebase(shoppingListSnapshot.val().units);
    const classes = this.classesFromFirebase(
      shoppingListSnapshot.val().classes,
    );

    const shoppingListData = shoppingListSnapshot.val().shoppingList;

    const id = shoppingListSnapshot.key;
    const name = shoppingListData.name;

    const productsList = this.productsFromFirebase(
      shoppingListData.productsList,
      id,
    );

    const shoppingList = {
      id,
      name,
      productsList,
    };

    return {shoppingList, units, classes};
  }

  static productsFromFirebase(productsSnapshot, shoppingListId) {
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
