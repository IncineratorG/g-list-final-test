import {
  LOAD_LOCAL_SIGN_IN_INFO_BEGIN,
  LOAD_LOCAL_SIGN_IN_INFO_ERROR, LOAD_LOCAL_SIGN_IN_INFO_FINISHED,
  RESET_SIGN_ERRORS,
  SIGN_IN_BEGIN,
  SIGN_IN_ERROR,
  SIGN_IN_FINISHED,
  SIGN_OUT_BEGIN,
  SIGN_OUT_ERROR,
  SIGN_OUT_FINISHED,
  SIGN_UP_BEGIN,
  SIGN_UP_ERROR,
  SIGN_UP_FINISHED,
} from '../types/collaborationTypes';
import {Collaboration} from '../../services/collaboration/Collaboration';
import {Storage} from '../../services/storage/Storage';

export const loadLocalSignInInfo = () => {
  return async dispatch => {
    dispatch({type: LOAD_LOCAL_SIGN_IN_INFO_BEGIN});

    try {
      const signInInfo = await Storage.getSignInInfo();
      dispatch({type: LOAD_LOCAL_SIGN_IN_INFO_FINISHED, payload: signInInfo});
    } catch (e) {
      dispatch({type: LOAD_LOCAL_SIGN_IN_INFO_ERROR, payload: {}});
    }
  };
};

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

    try {
      await Storage.removeSignInInfo();
      dispatch({type: SIGN_OUT_FINISHED});
    } catch (e) {
      dispatch({type: SIGN_OUT_ERROR});
    }
  };
};

export const resetSignErrors = () => {
  return async dispatch => {
    dispatch({type: RESET_SIGN_ERRORS});
  };
};
