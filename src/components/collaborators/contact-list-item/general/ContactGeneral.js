import React from 'react';
import {Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import {Collaboration} from '../../../../services/collaboration/Collaboration';
import {icons} from '../../../../assets/icons';

export const ContactGeneral = ({styles, listItem, onSelectPress}) => {
  const {email, status, selected, pending, error} = listItem;

  const selectContactPressHandler = () => {
    if (status === Collaboration.collaboratorStatus.NOT_EXIST) {
      console.log('WARNING_MESSAGE');
      return;
    }

    if (onSelectPress) {
      onSelectPress({contact: listItem});
    }
  };

  let selectButtonStyle = styles.selectButton;
  let statusImageComponent = null;

  if (pending) {
    selectButtonStyle = styles.selectButtonChecking;
    statusImageComponent = (
      <Image style={styles.statusIcon} source={icons.check_progress} />
    );
  } else if (error) {
    selectButtonStyle = styles.selectButtonNotExist;
    statusImageComponent = (
      <Image style={styles.statusIcon} source={icons.warning} />
    );
  } else if (selected) {
    selectButtonStyle = styles.selectButtonSelected;
    statusImageComponent = (
      <Image style={styles.statusIconSelected} source={icons.checkmark} />
    );
  } else if (status === Collaboration.collaboratorStatus.EXIST) {
    selectButtonStyle = styles.selectButtonExist;
    statusImageComponent = null;
  } else if (status === Collaboration.collaboratorStatus.NOT_EXIST) {
    selectButtonStyle = styles.selectButtonNotExist;
    statusImageComponent = (
      <Image style={styles.statusIcon} source={icons.warning} />
    );
  } else if (status === Collaboration.collaboratorStatus.UNKNOWN) {
    selectButtonStyle = styles.selectButtonChecking;
    statusImageComponent = (
      <Image style={styles.statusIcon} source={icons.check_progress} />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.emailContainer}>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.selectButtonContainer}>
        <TouchableWithoutFeedback onPress={selectContactPressHandler}>
          <View style={selectButtonStyle}>{statusImageComponent}</View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
