import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {ProgressDialog} from 'react-native-simple-dialogs';

const CollaboratorsView = ({styles, model, controller}) => {
  const {
    enteredPhone,
    collaboratorChecking,
    collaboratorCheckError,
    collaboratorCheckErrorDescription,
    collaboratorExist,
  } = model;

  const {enterPhoneInputHandler, enterPhoneButtonHandler} = controller;

  const checkCollaboratorDialog = (
    <ProgressDialog
      visible={collaboratorChecking}
      title={'Проверка телефона'}
      message={'Подождите'}
    />
  );

  const errorComponent = collaboratorCheckError ? (
    <View>
      <Text style={styles.errorText}>{collaboratorCheckErrorDescription}</Text>
    </View>
  ) : (
    <View>
      <Text />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {checkCollaboratorDialog}
      <View style={styles.phoneInputOuterContainer}>
        <View style={styles.phoneInputInnerContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder={'телефон'}
            spellCheck={false}
            autoCapitalize={'none'}
            value={enteredPhone}
            onChangeText={enterPhoneInputHandler}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.phoneInputButtonContainer}>
          <Button title={'Bt'} onPress={enterPhoneButtonHandler} />
        </View>
      </View>
      {errorComponent}
      <View style={styles.contactsListContainer}>
        <Text>Contacts List</Text>
      </View>
    </View>
  );
};

export default CollaboratorsView;
