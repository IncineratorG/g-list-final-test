import {
  clearPotentialCollaboratorData,
  sendTextMessage,
} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenController = model => {
  const enterPhoneInputHandler = text => {
    model.dispatch(clearPotentialCollaboratorData());
    model.setters.setEnteredPhone(text);
  };

  const enterPhoneButtonHandler = () => {
    console.log('PRESSS: ' + model.data.currentShoppingListId);

    model.dispatch(
      sendTextMessage({
        receiverPhone: model.data.enteredPhone,
        senderPhone: model.data.currentPhone,
        messageText: 'TEST_TEXT',
      }),
    );
  };

  return {
    enterPhoneInputHandler,
    enterPhoneButtonHandler,
  };
};
