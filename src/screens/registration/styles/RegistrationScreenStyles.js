import {StyleSheet} from 'react-native';

export const registrationScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 8,
  },
  modeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  signInLabelTouchable: {},
  signInLabelContainer: {},
  signInLabel: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  signUpLabelTouchable: {
    marginTop: 8,
  },
  signUpLabelContainer: {},
  signUpLabel: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputAreaContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    // backgroundColor: 'lightgrey',
  },
  emailContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgrey',
  },
  emailTextInput: {
    fontSize: 18,
  },
  passwordContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgrey',
    marginTop: 18,
  },
  passwordTextInput: {
    fontSize: 18,
  },
  passwordConfirmationContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'lightgrey',
    marginTop: 18,
  },
  passwordConfirmationTextInput: {
    fontSize: 18,
  },
  signInUpButtonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  // footerContainer: {
  //   flex: 1,
  // },
});
