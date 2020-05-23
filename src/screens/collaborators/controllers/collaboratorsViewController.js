import {
  addCollaborator,
  cancelShareShoppingListWithUser,
  shareShoppingListWithUser,
} from '../../../store/actions/collaborationActions';
import {Linking} from 'react-native';

export const useCollaboratorsScreenController = model => {
  const addCollaboratorButtonHandler = () => {
    // Linking.openURL('sms:?body=test1234?');

    model.setters.setCollaboratorInputAreaVisible(
      !model.data.collaboratorInputAreaVisible,
    );
  };

  const smsButtonHandler = () => {
    console.log('smsButtonHandler()');
    Linking.openURL('sms:?body=test1234');
  };

  const whatsAppButtonHandler = () => {
    console.log('whatsAppButtonHandler()');
    Linking.openURL('whatsapp://send?text=hello')
      .then(data => {})
      .catch(() => {
        console.log('NO_WHATSAPP_INSTALLED');
      });
  };

  const collaboratorInputAreaHideHandler = () => {
    model.setters.setCollaboratorInputAreaVisible(false);
  };

  const collaboratorInputSubmitEmailHandler = email => {
    if (email !== model.data.currentEmail) {
      model.dispatch(addCollaborator({email}));
    }
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
  };

  return {
    addCollaboratorButtonHandler,
    collaboratorInputAreaHideHandler,
    collaboratorInputSubmitEmailHandler,
    shadedBackgroundPressHandler,
    selectContactButtonPressHandler,
    smsButtonHandler,
    whatsAppButtonHandler,
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
