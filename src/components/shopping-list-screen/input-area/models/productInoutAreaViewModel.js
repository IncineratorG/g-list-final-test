import React, {useState, useEffect, useReducer} from 'react';
import {reducer} from '../store/inputAreaReducer';
import {initialState} from '../store/inputAreaState';
import {
  HIDE_INPUT_AREA,
  SET_CLASSES,
  SET_EDIT_PRODUCT,
  SET_UNIT,
  SET_UNITS,
} from '../store/inputAreaActions';
import {Keyboard, Picker} from 'react-native';

export const useProductInputAreaViewModel = ({
  editMode,
  editModeData,
  units,
  classes,
  onInputAreaHide,
  onSubmitValues,
  onShowSelectColorDialog,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectCategoryColorMode, setSelectCategoryColorMode] = useState(false);

  useEffect(() => {
    const keyboardHideHandler = () => {
      dispatch({type: HIDE_INPUT_AREA});

      if (onInputAreaHide) {
        onInputAreaHide();
      }
    };

    Keyboard.addListener('keyboardDidHide', keyboardHideHandler);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardHideHandler);
    };
  });

  useEffect(() => {
    if (units) {
      dispatch({type: SET_UNITS, payload: units});
      if (state.values.units.length && !editMode) {
        dispatch({type: SET_UNIT, payload: state.values.units[0].id});
      }
    }
  }, [state.values.units, units, editMode]);

  useEffect(() => {
    if (classes) {
      dispatch({type: SET_CLASSES, payload: classes});
    }
  }, [classes]);

  const pickerItems = state.values.units.map(unit => {
    return <Picker.Item label={unit.name} value={unit.id} key={unit.id} />;
  });

  useEffect(() => {
    if (editMode) {
      dispatch({type: SET_EDIT_PRODUCT, payload: editModeData});
      dispatch({type: SET_UNIT, payload: editModeData.unitId});
    }
  }, [editMode, editModeData]);

  return {
    data: {
      state,
      editMode,
      editModeData,
      units,
      classes,
      pickerItems,
      selectCategoryColorMode,
    },
    setters: {
      setSelectCategoryColorMode,
    },
    externalHandlers: {
      onInputAreaHide,
      onSubmitValues,
      onShowSelectColorDialog,
    },
    dispatch,
  };
};
