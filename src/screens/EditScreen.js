// Экран создания\редактирования эелемента списка покупок.

import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import ConfirmButton from '../components/ConfirmButton';
import CancelButton from '../components/CancelButton';

export default class EditScreen extends Component {
  render() {
    let data = [
      {
        value: 'Колбаса докторская',
      },
      {
        value: 'Колбаса любительская',
      },
      {
        value: 'Ливерная',
      },
    ];

    return (
      <View style={styles.mainContainer}>
        <View style={styles.inputFieldsContainer}>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.nameInput}
              placeholder="Название продукта"
            />
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityCountContainer}>
              <TextInput
                style={styles.quantityCountInput}
                placeholder="Кол-во"
              />
            </View>
            <View style={styles.quantityUnitContainer}>
              <Dropdown label='колбаса'
              data={data}/>
            </View>
          </View>
          <View style={styles.noteContainer}>
            <TextInput style={styles.noteInput} placeholder="Примечание" />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <CancelButton style={styles.cancelButton} />
          <View style={styles.buttonsFiller} />
          <ConfirmButton style={styles.confirmButton} />
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
  inputFieldsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'brown',
  },
  buttonsContainer: {
    height: 85,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  cancelButton: {
    // margin: 5,
  },
  confirmButton: {
    // margin: 5,
  },
  buttonsFiller: {
    alignSelf: 'stretch',
    width: 35,
  },
  nameInputContainer: {
    alignSelf: 'stretch',
    height: 50,
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    margin: 10,
  },
  nameInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 20,
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
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  quantityCountInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 20,
  },
  quantityUnitContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  noteInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 20,
  },
});
