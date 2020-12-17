import React from 'react';
import {Text, TouchableWithoutFeedback, View, Image} from 'react-native';
import {Collaboration} from '../../../../../services/collaboration/Collaboration';
import {icons} from '../../../../../assets/icons';

export const ContactGeneral = ({styles, listItem, onSelectPress}) => {
  const {email, status, selected, pending, error} = listItem;

  const contactColor = getContactColor(email);
  const contactFirstLetter = email.length ? email.charAt(0).toUpperCase() : '';

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
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: contactColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginLeft: 8,
        }}>
        <Text style={{color: 'white'}}>{contactFirstLetter}</Text>
      </View>
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

const getContactColor = contactEmail => {
  if (!contactEmail) {
    return 'grey';
  }

  const firstCharacter = contactEmail.charAt(0).toUpperCase();
  switch (firstCharacter) {
    case 'A': {
      return '#FF8033';
    }

    case 'B': {
      return '#795548';
    }

    case 'C': {
      return '#78909C';
    }

    case 'D': {
      return '#0288D1';
    }

    case 'E': {
      return '#BA68C8';
    }

    case 'F': {
      return '#4A148C';
    }

    case 'G': {
      return '#311B92';
    }

    case 'H': {
      return '#1E88E5';
    }

    case 'I': {
      return '#0091EA';
    }

    case 'J': {
      return '#43A047';
    }

    case 'K': {
      return '#33691E';
    }

    case 'L': {
      return '#FF3D00';
    }

    case 'M': {
      return '#000000';
    }

    case 'N': {
      return '#9575CD';
    }

    case 'O': {
      return '#FF4081';
    }

    case 'P': {
      return '#C51162';
    }

    case 'Q': {
      return '#D500F9';
    }

    case 'R': {
      return '#7B1FA2';
    }

    case 'S': {
      return '#448AFF';
    }

    case 'T': {
      return '#0091EA';
    }

    case 'U': {
      return '#827717';
    }

    case 'V': {
      return '#F4511E';
    }

    case 'W': {
      return '#D84315';
    }

    case 'X': {
      return '#FF3D00';
    }

    case 'Y': {
      return '#EC407A';
    }

    case 'Z': {
      return '#BA68C8';
    }

    default: {
      return 'grey';
    }
  }

  // return 'grey';
};
