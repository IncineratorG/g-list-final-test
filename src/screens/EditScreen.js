// Экран создания\редактирования эелемента списка покупок.

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ConfirmButton from '../components/ConfirmButton';
import CancelButton from '../components/CancelButton';

export default class EditScreen extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.inputFieldsContainer} />
        <View style={styles.buttonsContainer}>
          <ConfirmButton />
          <CancelButton />
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
  inputFieldsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'brown',
  },
  buttonsContainer: {
    height: 85,
    alignSelf: 'stretch',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
});
