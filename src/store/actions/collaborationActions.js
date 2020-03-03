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
