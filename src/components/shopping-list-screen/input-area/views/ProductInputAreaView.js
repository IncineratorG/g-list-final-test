import React from 'react';
import {
  Image,
  Picker,
  ScrollView,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {CategoriesList} from '../CategoriesList';
import {
  INPUT_CATEGORY,
  INPUT_NOTE,
  INPUT_PRODUCT_NAME,
} from '../store/inputAreaTypes';
import {icons} from '../../../../assets/icons';
import {IconButton} from '../../../common/IconButton';

const ProductInputAreaView = ({styles, model, controller}) => {
  const {state, pickerItems} = model.data;

  const {
    productNameButtonHandler,
    quantityButtonHandler,
    noteButtonHandler,
    categoryButtonHandler,
    changeInputTextHandler,
    unitsChangeHandler,
    categorySelectHandler,
    submitValues,
    acceptInputButtonHandler,
    submitEditingHandler,
    addCategoryButtonHandler,
  } = controller;

  const textInputOptionsComponent = state.textInputOptionsVisible ? (
    <Picker
      selectedValue={state.values.quantityUnit}
      style={{height: 50, width: 100}}
      mode={'dropdown'}
      onValueChange={unitsChangeHandler}>
      {pickerItems}
    </Picker>
  ) : null;

  const addCategoryButton = state.categoriesVisible ? (
    <TouchableHighlight
      style={{width: 30, height: 30, alignSelf: 'center'}}
      onPress={addCategoryButtonHandler}>
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: 'red',
          alignSelf: 'center',
        }}
      />
    </TouchableHighlight>
  ) : null;

  const categoriesComponent = state.categoriesVisible ? (
    <View style={styles.categoriesContainer}>
      <CategoriesList
        userInput={state.values.category}
        categories={state.values.classes}
        categoriesMap={state.values.classesMap}
        onCategoryPress={categorySelectHandler}
      />
    </View>
  ) : null;

  return (
    <View
      style={[
        styles.inputAreaContainer,
        {height: state.categoriesVisible ? 150 : 100},
      ]}>
      {categoriesComponent}
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
              : state.currentInput === INPUT_CATEGORY
              ? state.values.category
              : state.values.quantityValue
          }
          autoFocus={true}
          keyboardType={state.keyboardType}
          blurOnSubmit={false}
          placeholder={state.values.placeholder}
          fontSize={18}
        />
        {addCategoryButton}
        {textInputOptionsComponent}
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
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'none'}>
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
        <View style={styles.categoryOptionButtonContainer}>
          <IconButton
            label={'Категория'}
            onPress={categoryButtonHandler}
            icon={icons.category}
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

export default ProductInputAreaView;
