import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Keyboard,
  Image,
} from 'react-native';
import {icons} from '../../../assets/icons';

const CollaboratorInputArea = ({onInputAreaHide, onSubmitValues}) => {
  const [email, setEmail] = useState('');
  const [emailAcceptable, setEmailAcceptable] = useState(false);

  const validEmail = emailToCheck => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailToCheck);
  };

  const submitEmail = () => {
    if (!emailAcceptable) {
      return;
    }

    if (onSubmitValues) {
      onSubmitValues(email);
    }

    setEmail('');
  };

  const acceptEmailHandler = () => submitEmail();
  const submitEmailHandler = () => submitEmail();

  const changeEmailInputHandler = text => {
    setEmail(text);
    setEmailAcceptable(validEmail(text));
  };

  useEffect(() => {
    const keyboardHideHandler = () => {
      if (onInputAreaHide) {
        onInputAreaHide();
      }
    };

    Keyboard.addListener('keyboardDidHide', keyboardHideHandler);
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardHideHandler);
    };
  });

  return (
    <View style={styles.inputAreaContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.titleBackground} />
      </View>
      <View style={styles.emailInputContainer}>
        <View style={styles.emailInputIconContainer}>
          <Image style={styles.emailInputIcon} source={icons.find_email} />
        </View>
        <TextInput
          style={styles.emailInput}
          autoFocus={true}
          fontSize={18}
          placeholder={'user@email.com'}
          value={email}
          autoCapitalize={'none'}
          onChangeText={changeEmailInputHandler}
          onSubmitEditing={submitEmailHandler}
          blurOnSubmit={false}
        />
        <TouchableHighlight
          style={styles.acceptEmailTouchable}
          onPress={acceptEmailHandler}>
          <View
            style={[
              styles.acceptEmailContainer,
              // eslint-disable-next-line react-native/no-inline-styles
              {backgroundColor: emailAcceptable ? '#304FFE' : '#CCCCCC'},
            ]}>
            <Image style={styles.acceptEmailIcon} source={icons.arrow_up} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputAreaContainer: {
    alignSelf: 'stretch',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleContainer: {
    height: 0,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  titleBackground: {
    flex: 1,
    alignSelf: 'stretch',
  },
  title: {
    color: 'black',
    marginLeft: 4,
    alignSelf: 'center',
  },
  emailInputContainer: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  emailInputIconContainer: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginLeft: 10,
  },
  emailInputIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  emailInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  acceptEmailTouchable: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginRight: 10,
    borderRadius: 4,
  },
  acceptEmailContainer: {
    backgroundColor: '#304FFE',
    height: 30,
    width: 30,
    alignSelf: 'center',
    padding: 4,
    borderRadius: 4,
  },
  acceptEmailIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

export default CollaboratorInputArea;
