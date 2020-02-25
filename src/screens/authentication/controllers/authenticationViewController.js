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
      signUp({
        phone: model.data.phone,
        email: model.data.email,
        password: model.data.password,
      }),
    );
  };

  const phoneInputHandler = text => {
    model.setters.setPhone(text);
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
    model.setters.setMode('signIn');
    model.setters.setShowError(false);
    model.setters.setPhone('');
    model.setters.setEmail('');
    model.setters.setPassword('');
    model.setters.setVerifyPassword('');
  };

  const signUpLabelPressHandler = () => {
    model.setters.setMode('signUp');
    model.setters.setShowError(false);
    model.setters.setPhone('');
    model.setters.setEmail('');
    model.setters.setPassword('');
    model.setters.setVerifyPassword('');
  };

  return {
    signInButtonHandler,
    signUpButtonHandler,
    phoneInputHandler,
    emailInputHandler,
    passwordInputHandler,
    verifyPasswordInputHandler,
    signInLabelPressHandler,
    signUpLabelPressHandler,
  };
};
