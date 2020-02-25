import {
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_FINISHED,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';

export const signUp = ({phone, email, password}) => {
  return async dispatch => {
    dispatch({type: SIGN_UP_BEGIN});

    try {
      const result = await Collaboration.signUp({phone, email, password});
      if (result.status === 'SUCCESS') {
        dispatch({type: SIGN_UP_FINISHED, payload: {phone, email, password}});
      } else {
        dispatch({type: SIGN_UP_ERROR, payload: result});
      }
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: {description: e, status: 'EXCEPTION'},
      });
    }
  };
};
