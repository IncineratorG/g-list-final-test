import {
  addCollaborator,
  cancelShareShoppingListWithUser,
  shareShoppingList,
  shareShoppingListWithUser,
} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenController = model => {
  const addCollaboratorButtonHandler = () => {
    model.setters.setCollaboratorInputAreaVisible(
      !model.data.collaboratorInputAreaVisible,
    );
  };

  const collaboratorInputAreaHideHandler = () => {
    model.setters.setCollaboratorInputAreaVisible(false);
  };

  const collaboratorInputSubmitEmailHandler = email => {
    // const currentMillis = Date.now();
    // const contact = {id: currentMillis, email};
    //
    // const contacts = model.data.contacts;
    // contacts.push(contact);
    //
    // model.setters.setContacts(contacts);

    model.dispatch(addCollaborator({email}));
  };

  const shadedBackgroundPressHandler = () => {
    model.setters.setCollaboratorInputAreaVisible(
      !model.data.collaboratorInputAreaVisible,
    );
  };

  const selectContactButtonPressHandler = ({contact}) => {
    const shoppingListId = model.data.currentShoppingListId;
    const sender = model.data.currentEmail;

    if (contact.selected) {
      model.dispatch(
        cancelShareShoppingListWithUser({
          sender,
          collaborator: contact,
          shoppingListId,
        }),
      );
    } else {
      model.dispatch(
        shareShoppingListWithUser({
          sender,
          collaborator: contact,
          shoppingListId,
        }),
      );
    }

    // const shoppingListId = model.data.currentShoppingListId;
    // const sender = model.data.currentEmail;
    // const receiver = email;

    // model.dispatch(shareShoppingList({receiver, sender, shoppingListId}));

    // const selectedContactData = model.data.contacts.filter(
    //   contact => contact.id === id,
    // );
    // if (selectedContactData.length <= 0) {
    //   console.log(
    //     'collaboratorsViewController->selectContactButtonPressHandler(): BAD_SELECTED_DATA_LENGTH',
    //   );
    //   return;
    // }
    //
    // const contact = selectedContactData[0];
    // if (contact.selected) {
    //   model.dispatch(unselectCollaborator({id}));
    // } else {
    //   model.dispatch(selectCollaborator({id}));
    // }
  };

  return {
    addCollaboratorButtonHandler,
    collaboratorInputAreaHideHandler,
    collaboratorInputSubmitEmailHandler,
    shadedBackgroundPressHandler,
    selectContactButtonPressHandler,
  };
};

// const emailButtonHandler = () => {
//   console.log('4');
//
//   const receiverEmail = model.data.enteredEmail;
//   if (!receiverEmail || receiverEmail.length <= 0) {
//     console.log(
//       'useCollaboratorsScreenController->emailButtonHandler(): BAD_INPUT_EMAIL',
//     );
//     return;
//   }
//
//   const senderEmail = model.data.currentEmail;
//   const shoppingListId = model.data.currentShoppingListId;
//
//   model.dispatch(
//     shareShoppingList({
//       receiver: receiverEmail,
//       sender: senderEmail,
//       shoppingListId,
//     }),
//   );
// };

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
