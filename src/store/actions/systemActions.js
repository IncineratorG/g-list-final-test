import {SET_ONLINE} from '../types/systemTypes';

export const setOnline = ({online}) => {
  return async dispatch => {
    dispatch({type: SET_ONLINE, payload: online});
  };
};
