import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {ContactsList} from '../../../components/collaborators/ContactsList';
import LinearGradient from 'react-native-linear-gradient';
import {AddButton} from '../../../components/common/AddButton';
import CollaboratorInputArea from '../../../components/collaborators/collaborator-input-area/CollaboratorInputArea';
import {EmptyCollaboratorsScreen} from '../../../components/collaborators/EmptyCollaboratorsScreen';
import {ProgressDialog} from 'react-native-simple-dialogs';
import {SendOptionsPanel} from '../../../components/collaborators/SendOptionsPanel';

const CollaboratorsView_V2 = ({styles, model, controller}) => {
  const {
    collaboratorInputAreaVisible,
    contacts,
    serviceBusy,
    smsAvailable,
    whatsAppAvailable,
  } = model;

  const {
    addCollaboratorButtonHandler,
    shadedBackgroundPressHandler,
    collaboratorInputAreaHideHandler,
    collaboratorInputSubmitEmailHandler,
    selectContactButtonPressHandler,
    smsButtonHandler,
    whatsAppButtonHandler,
  } = controller;

  const serviceBusyDialog = (
    <ProgressDialog
      visible={serviceBusy}
      title="Обновление списка"
      message="Пожалуйста, подождите..."
    />
  );

  const contactsListComponent = (
    <View style={styles.contactsListContainer}>
      <ContactsList
        list={contacts}
        onSelectContactPress={selectContactButtonPressHandler}
      />
    </View>
  );

  const emptyCollaboratorsScreenComponent = (
    <View style={styles.emptyCollaboratorsScreenContent}>
      <EmptyCollaboratorsScreen />
    </View>
  );

  const shadedBackgroundComponent = collaboratorInputAreaVisible ? (
    <TouchableWithoutFeedback
      onPress={shadedBackgroundPressHandler}
      behavior={'position'}>
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

  const collaboratorsScreenContent =
    contacts.length > 0
      ? contactsListComponent
      : emptyCollaboratorsScreenComponent;

  // ===
  const shareOptionsComponent =
    smsAvailable || whatsAppAvailable ? (
      <View style={styles.sendOptionsContainer}>
        <SendOptionsPanel
          onSmsPress={smsButtonHandler}
          onWhatsAppPress={whatsAppButtonHandler}
          smsAvailable={smsAvailable}
          whatsAppAvailable={whatsAppAvailable}
        />
      </View>
    ) : null;
  // ===

  return (
    <View style={styles.mainContainer}>
      {shareOptionsComponent}
      {collaboratorsScreenContent}
      {serviceBusyDialog}
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
