// Экран создания\редактирования эелемента списка покупок.

import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import ModalDropdown from 'react-native-modal-dropdown';
import {ConfirmButton} from '../components/ConfirmButton';
import {CancelButton} from '../components/CancelButton';

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
            <TextField
              // style={styles.nameInput}
              label="Название продукта"
              fontSize={20}
            />
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityCountContainer}>
              <TextField
                // style={styles.quantityCountInput}
                label="Кол-во"
                fontSize={20}
              />
            </View>
            <View style={styles.quantityUnitContainer}>
              <Dropdown label="колбаса" data={data} fontSize={20} />
            </View>
          </View>
          <View style={styles.noteContainer}>
            <TextField label="Примечание" fontSize={20} />
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
    backgroundColor: 'lightblue',
  },
  inputFieldsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'lightblue',
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
  },
  noteInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 20,
  },
});
