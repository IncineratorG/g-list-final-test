import React, {useEffect, useReducer} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
  Image,
  TouchableHighlight,
  Picker,
} from 'react-native';
import {IconButton} from '../../../components/common/IconButton';
import {icons} from '../../../assets/icons';
import {initialState} from './store/inputAreaState';
import {reducer} from './store/inputAreaReducer';
import {
  HIDE_INPUT_AREA,
  SELECT_PRODUCT_NAME,
  SELECT_QUANTITY,
  SELECT_NOTE,
  CHANGE_TEXT,
  SUBMIT_VALUES,
  SET_UNITS,
  SET_UNIT,
} from './store/inputAreaActions';
import {INPUT_NOTE, INPUT_PRODUCT_NAME} from './store/inputAreaTypes';

const ProductInputArea = ({onInputAreaHide, onSubmitValues, units}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const productNameButtonHandler = () => dispatch({type: SELECT_PRODUCT_NAME});
  const quantityButtonHandler = () => dispatch({type: SELECT_QUANTITY});
  const noteButtonHandler = () => dispatch({type: SELECT_NOTE});

  const changeInputTextHandler = text => {
    dispatch({type: CHANGE_TEXT, payload: text});
  };

  const submitValues = () => {
    if (!state.values.acceptable) {
      return;
    }

    const values = {
      productName: state.values.productName,
      quantityValue: state.values.quantityValue
        ? state.values.quantityValue
        : 1,
      quantityUnit: state.values.quantityUnit,
      note: state.values.note,
    };

    if (onSubmitValues) {
      onSubmitValues(values);
    }

    dispatch({type: SUBMIT_VALUES});
  };
  const acceptInputButtonHandler = () => submitValues();
  const submitEditingHandler = () => submitValues();

  const unitsChangeHandler = unitId =>
    dispatch({type: SET_UNIT, payload: unitId});

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
    dispatch({type: SET_UNITS, payload: units});
    if (state.values.units.length) {
      dispatch({type: SET_UNIT, payload: state.values.units[0].id});
    }
  }, [state.values.units, units]);

  const pickerItems = state.values.units.map(unit => {
    return <Picker.Item label={unit.name} value={unit.id} key={unit.id} />;
  });

  const textInputOptionsComponent = (
    <Picker
      selectedValue={state.values.quantityUnit}
      style={{height: 50, width: 100}}
      mode={'dropdown'}
      onValueChange={unitsChangeHandler}>
      {pickerItems}
    </Picker>
  );

  return (
    <View style={styles.inputAreaContainer}>
      <View style={styles.textInputContainer}>
        <View style={styles.textInputIconContainer}>
          <Image style={styles.textInputIcon} source={state.textInputIcon} />
        </View>
        <TextInput
          style={styles.textInput}
          onSubmitEditing={submitEditingHandler}
          onChangeText={changeInputTextHandler}
          value={
            state.currentInput === INPUT_PRODUCT_NAME
              ? state.values.productName
              : state.currentInput === INPUT_NOTE
              ? state.values.note
              : state.values.quantityValue
          }
          autoFocus={true}
          keyboardType={state.keyboardType}
          blurOnSubmit={false}
          placeholder={state.values.placeholder}
          fontSize={18}
        />
        {state.textInputOptionsVisible ? textInputOptionsComponent : null}
        <TouchableHighlight
          style={styles.acceptInputTouchable}
          onPress={acceptInputButtonHandler}>
          <View
            style={[
              styles.acceptInputContainer,
              {
                backgroundColor: state.values.acceptable
                  ? '#304FFE'
                  : '#CCCCCC',
              },
            ]}>
            <Image style={styles.acceptInputIcon} source={icons.arrow_up} />
          </View>
        </TouchableHighlight>
      </View>
      <ScrollView
        contentContainerStyle={styles.inputOptionsContainer}
        horizontal={true}
        keyboardShouldPersistTaps={'always'}>
        <View style={styles.productNameOptionButtonContainer}>
          <IconButton
            label={'Название продукта'}
            onPress={productNameButtonHandler}
            icon={icons.title}
          />
        </View>
        <View style={styles.quantityOptionButtonContainer}>
          <IconButton
            label={'Количество'}
            onPress={quantityButtonHandler}
            icon={icons.weight}
          />
        </View>
        <View style={styles.noteOptionButtonContainer}>
          <IconButton
            label={'Примечание'}
            onPress={noteButtonHandler}
            icon={icons.note}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputAreaContainer: {
    backgroundColor: 'red',
    alignSelf: 'stretch',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    alignSelf: 'stretch',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  textInputIconContainer: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginLeft: 10,
  },
  textInputIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  textInputOptionsContainer: {
    backgroundColor: 'green',
    height: 30,
    width: 100,
    alignSelf: 'center',
    // marginRight: 10,
  },
  acceptInputTouchable: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginRight: 10,
    borderRadius: 4,
  },
  acceptInputContainer: {
    backgroundColor: '#304FFE',
    height: 30,
    width: 30,
    alignSelf: 'center',
    padding: 4,
    borderRadius: 4,
  },
  acceptInputIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  inputOptionsContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  productNameOptionButtonContainer: {},
  quantityOptionButtonContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  noteOptionButtonContainer: {},
});

export default ProductInputArea;
