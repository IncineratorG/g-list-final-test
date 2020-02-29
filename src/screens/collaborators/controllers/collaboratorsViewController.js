import {
  checkUserExistence,
  clearPotentialCollaboratorData,
} from '../../../store/actions/collaborationActions';

export const useCollaboratorsScreenController = model => {
  const enterPhoneInputHandler = text => {
    model.dispatch(clearPotentialCollaboratorData());
    model.setters.setEnteredPhone(text);
  };

  const enterPhoneButtonHandler = () => {
    console.log('PRESSS: ' + model.data.currentShoppingListId);

    if (model.data.enteredPhone.length > 0) {
      model.dispatch(checkUserExistence({phone: model.data.enteredPhone}));
    }
  };

  return {
    enterPhoneInputHandler,
    enterPhoneButtonHandler,
  };
};
