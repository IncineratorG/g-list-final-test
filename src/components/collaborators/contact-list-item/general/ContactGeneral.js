import React from 'react';
import {Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import {Collaboration} from '../../../../services/collaboration/Collaboration';
import {icons} from '../../../../assets/icons';

export const ContactGeneral = ({styles, listItem, onSelectPress}) => {
  const {email, status} = listItem;

  const selectContactPressHandler = () => {
    if (onSelectPress) {
      onSelectPress(listItem.id);
    }
  };

  let selectButtonStyle = styles.selectButton;
  let statusImageComponent = null;

  if (status === Collaboration.collaboratorStatus.EXIST) {
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
