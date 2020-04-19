import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {ContactsList} from '../../../components/collaborators/ContactsList';

const CollaboratorsView = ({styles, model, controller}) => {
  const {
    enteredEmail,
    collaboratorChecking,
    collaboratorCheckError,
    collaboratorCheckErrorDescription,
    collaboratorExist,
  } = model;

  const {emailInputHandler, emailButtonHandler} = controller;

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

  const contactsListComponent = (
    <View stlye={styles.contactsListContainer}>
      <ContactsList />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {checkCollaboratorDialog}
      <View style={styles.emailInputOuterContainer}>
        <View style={styles.emailInputInnerContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder={'email'}
            spellCheck={false}
            autoCapitalize={'none'}
            value={enteredEmail}
            onChangeText={emailInputHandler}
          />
        </View>
        <View style={styles.emailInputButtonContainer}>
          <Button title={'Bt'} onPress={emailButtonHandler} />
        </View>
      </View>
      {errorComponent}
      {contactsListComponent}
    </View>
  );
};

export default CollaboratorsView;
