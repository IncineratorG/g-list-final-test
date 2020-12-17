import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';

export const ContactSelected = ({styles, listItem, onSelectPress}) => {
  const email = listItem.email;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.emailContainer}>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.selectButtonContainer}>
        <TouchableWithoutFeedback onPress={onSelectPress}>
          <View style={styles.selectButton} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
