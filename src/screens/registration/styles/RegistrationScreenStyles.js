import {StyleSheet} from 'react-native';

export const registrationScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 18,
    backgroundColor: '#edeef1',
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
    backgroundColor: 'transparent',
  },
  inputsContainer: {
    height: 150,
    backgroundColor: '#0086ea',
    borderRadius: 4,
  },
  emailOuterContainer: {
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
  },
  emailInnerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  emailIconContainer: {
    flex: 1,
    width: 50,
    backgroundColor: '#0086ea',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
  },
  emailIcon: {
    transform: [{scale: 0.6}],
  },
  passwordOuterContainer: {
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
  },
  passwordInnerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  passwordIconContainer: {
    flex: 1,
    width: 50,
    backgroundColor: '#0086ea',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
  },
  passwordIcon: {
    transform: [{scale: 0.5}],
  },
  verifyPasswordOuterContainer: {
    height: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  verifyPasswordInnerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  verifyPasswordIconContainer: {
    flex: 1,
    width: 50,
    backgroundColor: '#0086ea',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
  },
  verifyPasswordIcon: {
    transform: [{rotate: '45deg'}, {scale: 0.3}],
  },
  buttonContainer: {
    height: 90,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});


// export const registrationScreenStyles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     padding: 18,
//     backgroundColor: '#edeef1',
//   },
//   modeContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   signInLabelTouchable: {},
//   signInLabelContainer: {},
//   signInLabel: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   signUpLabelTouchable: {
//     marginTop: 8,
//   },
//   signUpLabelContainer: {},
//   signUpLabel: {
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   inputAreaContainer: {
//     flex: 3,
//     justifyContent: 'flex-start',
//     // backgroundColor: 'lightgrey',
//   },
//   emailContainer: {
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: 'lightgrey',
//   },
//   emailTextInput: {
//     fontSize: 18,
//   },
//   passwordContainer: {
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: 'lightgrey',
//     marginTop: 18,
//   },
//   passwordTextInput: {
//     fontSize: 18,
//   },
//   passwordConfirmationContainer: {
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: 'lightgrey',
//     marginTop: 18,
//   },
//   passwordConfirmationTextInput: {
//     fontSize: 18,
//   },
//   signInUpButtonContainer: {
//     marginTop: 40,
//     alignItems: 'center',
//   },
//   // footerContainer: {
//   //   flex: 1,
//   // },
// });
