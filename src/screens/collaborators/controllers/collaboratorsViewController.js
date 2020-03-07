import {
  clearPotentialCollaboratorData,
  shareShoppingList,
} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenController = model => {
  const enterPhoneInputHandler = text => {
    model.dispatch(clearPotentialCollaboratorData());
    model.setters.setEnteredPhone(text);
  };

  const enterPhoneButtonHandler = () => {
    if (
      !model.data.enteredPhone.length ||
      model.data.enteredPhone.length <= 0
    ) {
      console.log('BAD_RECEIVER_PHONE');
      return;
    }

    console.log('SHOPPING_LIST_ID: ' + model.data.currentShoppingListId);

    model.dispatch(
      shareShoppingList({
        receiverPhone: model.data.enteredPhone,
        senderPhone: model.data.currentPhone,
        shoppingListId: model.data.currentShoppingListId,
      }),
    );
  };

  return {
    enterPhoneInputHandler,
    enterPhoneButtonHandler,
  };
};
