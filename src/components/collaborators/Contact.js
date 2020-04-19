import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';

export const Contact = ({contact}) => {
  const email = contact;

  const selectButtonPressHandler = () => {
    console.log('selectButtonPressHandler()');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.emailContainer}>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.selectButtonContainer}>
        <TouchableWithoutFeedback onPress={selectButtonPressHandler}>
          <View style={styles.selectButton} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 7,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  emailContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  email: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8,
  },
  selectButtonContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    height: 30,
    width: 30,
    backgroundColor: 'yellow',
    borderRadius: 15,
  },
});
