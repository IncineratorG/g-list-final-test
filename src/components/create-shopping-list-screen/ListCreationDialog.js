import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';

const ListCreationDialog = ({
  listName,
  setListName,
  visible,
  onTouchOutside,
  onPositiveButton,
  onNegativeButton,
}) => {
  return (
    <ConfirmDialog
      keyboardShouldPersistTaps={'always'}
      visible={visible}
      onTouchOutside={onTouchOutside}
      positiveButton={{
        title: 'Создать',
        titleStyle: styles.positiveButton,
        onPress: onPositiveButton,
      }}
      negativeButton={{
        title: 'Отмена',
        titleStyle: styles.negativeButton,
        onPress: onNegativeButton,
      }}>
      <TextInput
        placeholder="Новый список"
        style={styles.listNameInput}
        autoFocus={true}
        onChangeText={text => setListName(text)}
        value={listName}
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
  negativeButton: {
    color: '#4a9dec',
  },
});

export default ListCreationDialog;
