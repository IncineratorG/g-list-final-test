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
import {ConfirmButton} from '../../components/common/ConfirmButton';
import CancelButton from '../../components/common/CancelButton';

export default class EditScreenV2 extends Component {
  render() {
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
          <View style={styles.nameInputContainer}>
            <TextField
              style={styles.nameInput}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              label="Название продукта"
              fontSize={20}
              labelOffset={{x0: 5, y0: -20, y1: -30}}
              lineWidth={0}
              activeLineWidth={0}
            />
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityCountContainer}>
              <TextField
                style={styles.quantityCountInput}
                label="Кол-во"
                fontSize={20}
                labelOffset={{x0: 5, y0: -20, y1: -30}}
                lineWidth={0}
                activeLineWidth={0}
              />
            </View>
            <View style={styles.quantityUnitContainer}>
              <Dropdown
                style={styles.quantityUnitDropdown}
                label=""
                data={data}
                fontSize={20}
                dropdownOffset={{top: 10, left: 50}}
                lineWidth={0}
                activeLineWidth={0}
                rippleOpacity={0}
                overlayStyle={{flex: 1, alignItems: 'center'}}
              />
            </View>
          </View>
          <View style={styles.noteContainer}>
            <TextField
              style={styles.noteInput}
              label="Примечание"
              fontSize={20}
              labelOffset={{x0: 5, y0: -20, y1: -30}}
              lineWidth={0}
              activeLineWidth={0}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
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
    backgroundColor: '#d5ffff',
    // backgroundColor: '#d5ffea',
  },
  inputFieldsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#d5ffea',
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
  nameInputContainer: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'white',
    margin: 10,
  },
  nameInput: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 25,
  },
  inputContainerStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  containerStyle: {
    flex: 1,
    alignSelf: 'stretch',
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
    fontSize: 25,
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
    fontSize: 25,
  },
});
