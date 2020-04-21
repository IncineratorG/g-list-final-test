import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {ContactsList} from '../../../components/collaborators/ContactsList';
import LinearGradient from 'react-native-linear-gradient';
import {AddButton} from '../../../components/common/AddButton';
import CollaboratorInputArea from '../../../components/collaborators/collaborator-input-area/CollaboratorInputArea';

const CollaboratorsView_V2 = ({styles, model, controller}) => {
  const {collaboratorInputAreaVisible} = model;

  const {
    addCollaboratorButtonHandler,
    shadedBackgroundPressHandler,
    collaboratorInputAreaHideHandler,
    collaboratorInputSubmitEmailHandler,
  } = controller;

  const contactsListComponent = (
    <View style={styles.contactsListContainer}>
      <ContactsList />
    </View>
  );

  const shadedBackgroundComponent = collaboratorInputAreaVisible ? (
    <TouchableWithoutFeedback onPress={shadedBackgroundPressHandler}>
      <View style={styles.shadedBackground} />
    </TouchableWithoutFeedback>
  ) : null;

  const collaboratorInputAreaComponent = collaboratorInputAreaVisible ? (
    <View style={styles.collaboratorInputAreaContainer}>
      <CollaboratorInputArea
        onInputAreaHide={collaboratorInputAreaHideHandler}
        onSubmitValues={collaboratorInputSubmitEmailHandler}
      />
    </View>
  ) : null;

  const addContactButtonComponent = !collaboratorInputAreaVisible ? (
    <AddButton
      style={[styles.addContactButton, {zIndex: 20}]}
      onClick={addCollaboratorButtonHandler}
    />
  ) : null;

  const bottomGradientComponent = !collaboratorInputAreaVisible ? (
    <LinearGradient
      style={styles.bottomGradient}
      colors={[
        'rgba(255, 255, 255, 0.0)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(255, 255, 255, 1.0)',
      ]}
    />
  ) : null;

  return (
    <View style={styles.mainContainer}>
      {contactsListComponent}
      <View style={styles.addContactButtonContainer}>
        {addContactButtonComponent}
      </View>
      {collaboratorInputAreaComponent}
      {shadedBackgroundComponent}
      {bottomGradientComponent}
    </View>
  );
};

export default CollaboratorsView_V2;
