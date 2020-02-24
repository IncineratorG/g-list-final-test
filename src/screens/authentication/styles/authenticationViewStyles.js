import {StyleSheet} from 'react-native';

export const authenticationViewStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 18,
    backgroundColor: '#edeef1',
  },
  modeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modeSignInTextContainer: {
    alignSelf: 'flex-start',
  },
  modeSignUpTextContainer: {
    alignSelf: 'flex-start',
  },
  inputAreaContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  inputsContainer: {
    height: 150,
  },
  buttonContainer: {
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
