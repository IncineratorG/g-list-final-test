import {
  CHECK_USER_EXISTENCE_BEGIN,
  CHECK_USER_EXISTENCE_ERROR,
  CHECK_USER_EXISTENCE_FINISH,
  CLEAR_POTENTIAL_COLLABORATOR_DATA,
  SEND_TEXT_MESSAGE_BEGIN,
  SEND_TEXT_MESSAGE_ERROR,
  SEND_TEXT_MESSAGE_FINISH,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';
import {Storage} from '../../services/storage/Storage';

export const clearPotentialCollaboratorData = () => {
  return async dispatch => {
    dispatch({type: CLEAR_POTENTIAL_COLLABORATOR_DATA});
  };
};

export const checkUserExistence = ({phone}) => {
  return async dispatch => {
    dispatch({type: CHECK_USER_EXISTENCE_BEGIN});

    try {
      const exist = await Collaboration.userExist({phone});
      dispatch({type: CHECK_USER_EXISTENCE_FINISH, payload: {phone, exist}});
    } catch (e) {
      dispatch({type: CHECK_USER_EXISTENCE_ERROR, payload: {description: e}});
    }
  };
};

export const sendTextMessage = ({receiverPhone, senderPhone, messageText}) => {
  return async dispatch => {
    dispatch({type: SEND_TEXT_MESSAGE_BEGIN});

    try {
      await Collaboration.sendMessage({
        receiverPhone,
        senderPhone,
        messageText,
      });

      dispatch({type: SEND_TEXT_MESSAGE_FINISH});
    } catch (e) {
      dispatch({type: SEND_TEXT_MESSAGE_ERROR});
    }
  };
};

export const shareShoppingList = ({
  receiverPhone,
  senderPhone,
  shoppingListId,
}) => {
  return async dispatch => {
    console.log('HERE');

    const units = await Storage.getUnits();
    const classes = await Storage.getClasses();

    const shoppingListName = await Storage.getShoppingListName(shoppingListId);
    const products = await Storage.getProductsList(shoppingListId);

    const shoppingList = {
      id: shoppingListId,
      name: shoppingListName,
      products,
    };

    await Collaboration.shareShoppingList({
      receiver: receiverPhone,
      sender: senderPhone,
      shoppingList,
      units,
      classes,
    });

    // const productsListUnitsIds = [];
    // const productsListClassesIds = [];
    // productsList.map(product => {
    //   if (productsListUnitsIds.indexOf(product.unitId) < 0) {
    //     productsListUnitsIds.push(product.unitId);
    //   }
    //   if (productsListClassesIds.indexOf(product.classId) < 0) {
    //     productsListClassesIds.push(product.classId);
    //   }
    // });
    //
    // const productListUnits = units.filter(
    //   unit => productsListUnitsIds.indexOf(unit.id) >= 0,
    // );
    // const productListClasses = classes.filter(
    //   cl => productsListClassesIds.indexOf(cl.id) >= 0,
    // );
    //
    // productListUnits.forEach(unit => console.log(unit.id + ' - ' + unit.name));
    // productListClasses.forEach(cl => console.log(cl.id + ' - ' + cl.name));
    //
    // const shoppingListShareData = {
    //   name: shoppingListName,
    //   products: productsList,
    //   classes: productListClasses,
    //   units: productListUnits,
    // };
  };
};
