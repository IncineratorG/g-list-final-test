export const useRegistrationScreenController = model => {
  const signInButtonHandler = () => {
    console.log('SIGN_IN_PRESSED');
  };

  const signUpButtonHandler = () => {
    console.log('SIGN_UP_PRESSED');
  };

  const signInLabelPressHandler = () => {
    console.log('SIGN_IN_LABEL_PRESSED');
    model.setters.setMode('signIn');
  };

  const signUpLabelPressHandler = () => {
    console.log('SIGN_UP_LABEL_PRESS');
    model.setters.setMode('signUp');
  };

  return {
    signInButtonHandler,
    signUpButtonHandler,
    signInLabelPressHandler,
    signUpLabelPressHandler,
  };
};
