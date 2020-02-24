import {signUp} from '../../../store/actions/collaborationActions';

export const useRegistrationScreenController = model => {
  const signInButtonHandler = () => {
    console.log('SIGN_IN_BUTTON_PRESSED');
    console.log('email: ' + model.data.email);
    console.log('password: ' + model.data.password);
  };

  const signUpButtonHandler = () => {
    if (model.data.password !== model.data.verifyPassword) {
      console.log('BAD_VERIFICATION_PASSWORD');
      return;
    }

    model.dispatch(
      signUp({email: model.data.email, password: model.data.password}),
    );
  };

  const emailInputHandler = text => {
    model.setters.setEmail(text);
  };

  const passwordInputHandler = text => {
    model.setters.setPassword(text);
  };

  const verifyPasswordInputHandler = text => {
    model.setters.setVerifyPassword(text);
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
    emailInputHandler,
    passwordInputHandler,
    verifyPasswordInputHandler,
    signInLabelPressHandler,
    signUpLabelPressHandler,
  };
};
