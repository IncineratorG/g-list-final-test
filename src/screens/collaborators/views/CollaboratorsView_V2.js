import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {ContactsList} from '../../../components/collaborators/ContactsList';
import LinearGradient from 'react-native-linear-gradient';
import {AddButton} from '../../../components/common/AddButton';

const CollaboratorsView_V2 = ({styles, model, controller}) => {
  const addButtonPressHandler = () => {
    console.log('addButtonPressHandler()');
  };

  const contactsListComponent = (
    <View style={styles.contactsListContainer}>
      <ContactsList />
    </View>
  );

  const addContactButtonComponent = (
    <AddButton
      style={[styles.addContactButton, {zIndex: 20}]}
      onClick={addButtonPressHandler}
    />
  );

  const bottomGradientComponent = (
    <LinearGradient
      style={styles.bottomGradient}
      colors={[
        'rgba(255, 255, 255, 0.0)',
        'rgba(255, 255, 255, 0.5)',
        'rgba(255, 255, 255, 1.0)',
      ]}
    />
  );

  return (
    <View style={styles.mainContainer}>
      {contactsListComponent}
      <View style={styles.addContactButtonContainer}>
        {addContactButtonComponent}
      </View>
      {bottomGradientComponent}
    </View>
  );
};

export default CollaboratorsView_V2;
