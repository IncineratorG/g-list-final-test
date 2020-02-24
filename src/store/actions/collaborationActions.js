import {SIGN_UP_BEGIN, SIGN_UP_ERROR} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';

export const signUp = ({email, password}) => {
  return async dispatch => {
    dispatch({type: SIGN_UP_BEGIN});

    try {
      await Collaboration.signUp({email, password});
    } catch (e) {
      dispatch({type: SIGN_UP_ERROR, payload: e});
    }
  };
};
