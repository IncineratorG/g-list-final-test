// Экран создания\редактирования эелемента списка покупок.

import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {ConfirmButton} from '../../components/common/ConfirmButton';

const EditScreenV3 = () => {
  let data = [
    {
      value: 'кг',
    },
    {
      value: 'л',
    },
    {
      value: 'г',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputFieldsContainer}>
        <Text style={styles.nameInputLabel}>Название продукта </Text>
        <View style={styles.nameInputContainer}>
          <TextInput style={styles.nameInput} placeholder="Название продукта" />
        </View>
        <View style={styles.quantityContainerWrapper}>
          <Text style={styles.quantityContainerLabel}>Количество </Text>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityCountContainer}>
              <TextInput
                style={styles.quantityCountInput}
                placeholder="Кол-во"
              />
            </View>
            <View style={styles.quantityUnitContainer}>
              <Dropdown
                style={styles.quantityUnitDropdown}
                label=""
                data={data}
                fontSize={20}
                lineWidth={0}
                activeLineWidth={0}
                dropdownOffset={{top: -8, left: 0}}
                rippleOpacity={0}
                overlayStyle={{flex: 1, alignItems: 'center'}}
              />
            </View>
          </View>
        </View>
        <Text style={styles.noteInputLabel}>Примечание </Text>
        <View style={styles.noteContainer}>
          <TextInput style={styles.noteInput} placeholder="Примечание" />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <ConfirmButton style={styles.confirmButton} />
        <View />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5ffff',
    // backgroundColor: '#d5ffea',
  },
  inputFieldsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#d5ffea',
  },
  nameInputLabel: {
    marginLeft: 10,
    color: 'gray',
    marginBottom: 3,
    marginTop: 10,
  },
  buttonsContainer: {
    padding: 6,
    height: 85,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  cancelButton: {
    // margin: 5,
  },
  confirmButton: {
    flex: 1,
    alignSelf: 'stretch',
    // margin: 15,
  },
  noteInputLabel: {
    marginLeft: 10,
    color: 'gray',
    marginBottom: 3,
  },
  nameInputContainer: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  nameInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 22,
  },
  inputContainerStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  containerStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  quantityContainerWrapper: {},
  quantityContainerLabel: {
    marginLeft: 10,
    color: 'gray',
    marginBottom: 3,
  },
  quantityContainer: {
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  quantityCountContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginRight: 10,
    backgroundColor: 'white',
  },
  quantityCountInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 22,
  },
  quantityUnitContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    paddingTop: 10,
    // marginTop: 10,
  },
  quantityUnitDropdown: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 25,
  },
  quantityUnitInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 20,
  },
  noteContainer: {
    height: 50,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  noteInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 22,
  },
});

export default EditScreenV3;
