import {
  RESET_SIGN_ERRORS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_FINISHED,
  SIGN_OUT_BEGIN,
  SIGN_OUT_FINISHED,
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_FINISHED,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';
import {Storage} from '../../services/storage/Storage';

export const signUp = ({phone, email, password}) => {
  return async dispatch => {
    dispatch({type: SIGN_UP_BEGIN});

    try {
      const result = await Collaboration.signUp({phone, email, password});
      if (result.status === 'SUCCESS') {
        await Storage.updateSignInInfo({phone, email, password});

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

export const signIn = ({phone, password}) => {
  return async dispatch => {
    dispatch({type: SIGN_IN_BEGIN});

    try {
      const result = await Collaboration.signIn({phone, password});
      if (result.status === 'SUCCESS') {
        const email = '';
        await Storage.updateSignInInfo({phone, email, password});

        dispatch({
          type: SIGN_IN_FINISHED,
          payload: {phone, password, email: ''},
        });
      } else {
        dispatch({type: SIGN_IN_ERROR, payload: result});
      }
    } catch (e) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: {description: e, status: 'EXCEPTION'},
      });
    }
  };
};

export const signOut = () => {
  return async dispatch => {
    dispatch({type: SIGN_OUT_BEGIN});

    dispatch({type: SIGN_OUT_FINISHED});
  };
};

export const resetSignErrors = () => {
  return async dispatch => {
    dispatch({type: RESET_SIGN_ERRORS});
  };
};
