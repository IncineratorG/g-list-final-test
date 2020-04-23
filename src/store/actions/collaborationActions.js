import {Collaboration} from '../../services/collaboration/Collaboration';

export const addCollaborator = ({email}) => {
  return async dispach => {
    console.log('addCollaborator(): ' + email);

    const userExist = await Collaboration.userExist({email});

    console.log('EXIST: ' + userExist);
  };
};

// =========
// ================
// export const clearPotentialCollaboratorData = () => {
//   return async dispatch => {
//     dispatch({type: CLEAR_POTENTIAL_COLLABORATOR_DATA});
//   };
// };
//
// export const checkUserExistence = ({phone}) => {
//   return async dispatch => {
//     dispatch({type: CHECK_USER_EXISTENCE_BEGIN});
//
//     try {
//       const exist = await Collaboration.userExist({phone});
//       dispatch({type: CHECK_USER_EXISTENCE_FINISH, payload: {phone, exist}});
//     } catch (e) {
//       dispatch({type: CHECK_USER_EXISTENCE_ERROR, payload: {description: e}});
//     }
//   };
// };
//
// export const sendTextMessage = ({receiverPhone, senderPhone, messageText}) => {
//   return async dispatch => {
//     dispatch({type: SEND_TEXT_MESSAGE_BEGIN});
//
//     try {
//       await Collaboration.sendMessage({
//         receiverPhone,
//         senderPhone,
//         messageText,
//       });
//
//       dispatch({type: SEND_TEXT_MESSAGE_FINISH});
//     } catch (e) {
//       dispatch({type: SEND_TEXT_MESSAGE_ERROR});
//     }
//   };
// };
//
// export const shareShoppingList = ({receiver, sender, shoppingListId}) => {
//   return async dispatch => {
//     const shoppingListData = await Storage.subscribe({
//       shoppingListId,
//       event: Storage.events.SHOPPING_LIST_CHANGED,
//       once: true,
//     });
//
//     const shoppingList = shoppingListData.data;
//     shoppingList.creator = sender;
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const receivers = [];
//     receivers.push(receiver);
//
//     const shoppingListCard = {
//       name: shoppingList.name,
//       totalItemsCount: shoppingList.totalItemsCount,
//       completedItemsCount: shoppingList.completedItemsCount,
//       createTimestamp: shoppingList.createTimestamp,
//       updateTimestamp: shoppingList.updateTimestamp,
//       creator: sender,
//     };
//
//     await Collaboration.shareShoppingList({
//       receivers: receivers,
//       sender: sender,
//       shoppingList,
//       shoppingListCard,
//       units,
//       classes,
//     });
//   };
// };
// ================
// =========

// export const shareShoppingList = ({
//   receiverPhone,
//   senderPhone,
//   shoppingListId,
// }) => {
//   return async dispatch => {
//     const shoppingListData = await Storage.subscribe({
//       shoppingListId,
//       event: Storage.events.SHOPPING_LIST_CHANGED,
//       once: true,
//     });
//
//     const shoppingList = shoppingListData.data;
//     shoppingList.creator = senderPhone;
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const receivers = [];
//     receivers.push(receiverPhone);
//
//     const shoppingListCard = {
//       name: shoppingList.name,
//       totalItemsCount: shoppingList.totalItemsCount,
//       completedItemsCount: shoppingList.completedItemsCount,
//       createTimestamp: shoppingList.createTimestamp,
//       updateTimestamp: shoppingList.updateTimestamp,
//       creator: senderPhone,
//     };
//
//     await Collaboration.shareShoppingList({
//       receivers: receivers,
//       sender: senderPhone,
//       shoppingList,
//       shoppingListCard,
//       units,
//       classes,
//     });
//   };
// };

// export const shareShoppingList = ({
//   receiverPhone,
//   senderPhone,
//   shoppingListId,
// }) => {
//   return async dispatch => {
//     console.log('HERE');
//
//     const units = await Storage.getUnits({shoppingListId});
//     const classes = await Storage.getClasses({shoppingListId});
//
//     const shoppingListName = await Storage.getShoppingListName({
//       shoppingListId,
//     });
//     const products = await Storage.getProductsList({shoppingListId});
//
//     const shoppingList = {
//       id: shoppingListId,
//       name: shoppingListName,
//       products,
//     };
//
//     await Collaboration.shareShoppingList({
//       receiver: receiverPhone,
//       sender: senderPhone,
//       shoppingList,
//       units,
//       classes,
//     });
//
//     // const productsListUnitsIds = [];
//     // const productsListClassesIds = [];
//     // productsList.map(product => {
//     //   if (productsListUnitsIds.indexOf(product.unitId) < 0) {
//     //     productsListUnitsIds.push(product.unitId);
//     //   }
//     //   if (productsListClassesIds.indexOf(product.classId) < 0) {
//     //     productsListClassesIds.push(product.classId);
//     //   }
//     // });
//     //
//     // const productListUnits = units.filter(
//     //   unit => productsListUnitsIds.indexOf(unit.id) >= 0,
//     // );
//     // const productListClasses = classes.filter(
//     //   cl => productsListClassesIds.indexOf(cl.id) >= 0,
//     // );
//     //
//     // productListUnits.forEach(unit => console.log(unit.id + ' - ' + unit.name));
//     // productListClasses.forEach(cl => console.log(cl.id + ' - ' + cl.name));
//     //
//     // const shoppingListShareData = {
//     //   name: shoppingListName,
//     //   products: productsList,
//     //   classes: productListClasses,
//     //   units: productListUnits,
//     // };
//   };
// };
