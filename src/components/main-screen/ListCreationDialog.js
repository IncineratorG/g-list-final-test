import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ConfirmDialog, Dialog} from 'react-native-simple-dialogs';
import DialogInput from 'react-native-dialog-input';

const ListCreationDialog = ({visible, onTouchOutside, onPositiveButton}) => {
  return (
    <ConfirmDialog
      keyboardShouldPersistTaps={'always'}
      visible={visible}
      onTouchOutside={onTouchOutside}
      positiveButton={{
        title: 'Создать',
        titleStyle: styles.positiveButton,
        onPress: onPositiveButton,
      }}>
      <TextInput
        placeholder="Новый список"
        style={styles.listNameInput}
        autoFocus={true}
      />
    </ConfirmDialog>
  );
};

const styles = StyleSheet.create({
  listNameInput: {
    fontSize: 18,
  },
  positiveButton: {
    color: '#4a9dec',
  },
});

export default ListCreationDialog;
