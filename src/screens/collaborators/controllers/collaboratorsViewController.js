import {
  addCollaborator,
  selectCollaborator,
  unselectCollaborator,
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

  const selectContactButtonPressHandler = (id, status) => {
    const selectedContactData = model.data.contacts.filter(
      contact => contact.id === id,
    );
    if (selectedContactData.length <= 0) {
      console.log(
        'collaboratorsViewController->selectContactButtonPressHandler(): BAD_SELECTED_DATA_LENGTH',
      );
      return;
    }

    const contact = selectedContactData[0];
    if (contact.selected) {
      model.dispatch(unselectCollaborator({id}));
    } else {
      model.dispatch(selectCollaborator({id}));
    }

    // console.log('selectContactButtonPressHandler(): ' + id + ' - ' + status);
    //
    // let contactsList = model.data.contacts.slice(0);
    // contactsList = contactsList.map(contact => {
    //   if (contact.id === id) {
    //     contact.selected = !contact.selected;
    //   }
    //
    //   return contact;
    // });
    //
    // model.setters.setContacts(contactsList);
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
