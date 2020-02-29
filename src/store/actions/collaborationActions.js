import {
  CHECK_USER_EXISTENCE_BEGIN,
  CHECK_USER_EXISTENCE_ERROR,
  CHECK_USER_EXISTENCE_FINISH,
  CLEAR_POTENTIAL_COLLABORATOR_DATA,
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
