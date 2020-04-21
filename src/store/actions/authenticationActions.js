import {
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
  SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_BEGIN,
  SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_ERROR,
  SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_FINISHED,
  UPDATE_LOCAL_SIGN_IN_INFO,
} from '../types/authenticationTypes';
import {Authentication} from '../../services/authentication/Authentication';

export const subscribeToLocalSignInInfo = () => {
  return async dispatch => {
    dispatch({type: SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_BEGIN});

    try {
      const localSignInInfoChangedHandler = signInInfo => {
        dispatch({type: UPDATE_LOCAL_SIGN_IN_INFO, payload: signInInfo});
      };

      const subscription = await Authentication.subscribe({
        event: Authentication.events.SIGN_IN_INFO_CHANGED,
        handler: localSignInInfoChangedHandler,
      });

      dispatch({
        type: SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_FINISHED,
        payload: {
          unsubscribe: subscription.unsubscribe,
          signInInfo: subscription.data,
        },
      });
    } catch (e) {
      dispatch({type: SUBSCRIBE_TO_LOCAL_SIGN_IN_INFO_ERROR, payload: e});
    }
  };
};

export const signUp = ({phone, email, password}) => {
  return async dispatch => {
    dispatch({type: SIGN_UP_BEGIN});

    try {
      const result = await Authentication.signUp({phone, email, password});
      if (result.status === 'SUCCESS') {
        await Authentication.updateSignInInfo({phone, email, password});

        dispatch({type: SIGN_UP_FINISHED});
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

export const signIn = ({phone, email, password}) => {
  return async dispatch => {
    dispatch({type: SIGN_IN_BEGIN});

    try {
      const result = await Authentication.signIn({phone, email, password});
      if (result.status === 'SUCCESS') {
        await Authentication.updateSignInInfo({phone, email, password});

        dispatch({type: SIGN_IN_FINISHED});
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
      await Authentication.removeSignInInfo();
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
