import {
  clearPotentialCollaboratorData,
  sendTextMessage,
  shareShoppingList,
} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenController = model => {
  const emailInputHandler = text => {
    model.dispatch(clearPotentialCollaboratorData());
    model.setters.setEnteredEmail(text);
  };

  const emailButtonHandler = () => {
    console.log('4');

    const receiverEmail = model.data.enteredEmail;
    if (!receiverEmail || receiverEmail.length <= 0) {
      console.log(
        'useCollaboratorsScreenController->emailButtonHandler(): BAD_INPUT_EMAIL',
      );
      return;
    }

    const senderEmail = model.data.currentEmail;
    const shoppingListId = model.data.currentShoppingListId;

    model.dispatch(
      shareShoppingList({
        receiver: receiverEmail,
        sender: senderEmail,
        shoppingListId,
      }),
    );
  };

  // const enterPhoneInputHandler = text => {
  //   console.log('1');
  //
  //   // model.dispatch(clearPotentialCollaboratorData());
  //   // model.setters.setEnteredPhone(text);
  // };

  // const enterPhoneButtonHandler = () => {
  //   console.log('3');
  //
  //   // if (
  //   //   !model.data.enteredPhone.length ||
  //   //   model.data.enteredPhone.length <= 0
  //   // ) {
  //   //   console.log('BAD_RECEIVER_PHONE');
  //   //   return;
  //   // }
  //   //
  //   // console.log('SHOPPING_LIST_ID: ' + model.data.currentShoppingListId);
  //   //
  //   // // model.dispatch(
  //   // //   sendTextMessage({
  //   // //     receiverPhone: model.data.enteredPhone,
  //   // //     senderPhone: model.data.currentPhone,
  //   // //     messageText: 'MESSAGE',
  //   // //   }),
  //   // // );
  //   //
  //   model.dispatch(
  //     shareShoppingList({
  //       receiverPhone: model.data.enteredPhone,
  //       senderPhone: model.data.currentPhone,
  //       shoppingListId: model.data.currentShoppingListId,
  //     }),
  //   );
  // };

  return {
    emailInputHandler,
    emailButtonHandler,
  };
};
