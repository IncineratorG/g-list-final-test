import {signIn, signUp} from '../../../store/actions/authenticationActions';

export const useRegistrationScreenController = model => {
  const signInButtonHandler = () => {
    const phone = model.data.internationalPhone;
    const email = model.data.email;
    const password = model.data.password;
    const validPhoneLength = model.data.validPhoneLength;

    if (!email || !password || password.length <= 0) {
      console.log('BAD_DATA');
      return;
    }

    model.dispatch(signIn({phone, email, password}));
  };

  const signUpButtonHandler = () => {
    const phone = model.data.internationalPhone;
    const email = model.data.email;
    const password = model.data.password;
    const verifyPassword = model.data.verifyPassword;
    const validPhoneLength = model.data.validPhoneLength;

    if (
      !email ||
      !password ||
      password.length <= 0 ||
      password !== verifyPassword
    ) {
      console.log('BAD_DATA');
      return;
    }

    model.dispatch(
      signUp({
        phone,
        email,
        password,
      }),
    );
  };

  const phoneInputHandler = text => {
    const countryCallingCode = '+7';

    let rawPhone = text;
    let formattedPhone = '';

    rawPhone = rawPhone.replace(/ /g, '');
    rawPhone = rawPhone.replace(/-/g, '');
    rawPhone = rawPhone.replace(/\(/g, '');
    rawPhone = rawPhone.replace(/\)/g, '');
    rawPhone = rawPhone.replace(/\+7/g, '');

    if (rawPhone.length > 10) {
      return;
    }

    if (rawPhone.length <= 0) {
      formattedPhone = rawPhone;
    } else if (rawPhone.length > 0 && rawPhone.length <= 3) {
      formattedPhone = countryCallingCode + '(' + rawPhone;
    } else if (rawPhone.length > 3 && rawPhone.length <= 6) {
      formattedPhone =
        countryCallingCode +
        '(' +
        rawPhone.substr(0, 3) +
        ') ' +
        rawPhone.substr(3);
    } else if (rawPhone.length > 6 && rawPhone.length <= 8) {
      formattedPhone =
        countryCallingCode +
        '(' +
        rawPhone.substr(0, 3) +
        ') ' +
        rawPhone.substr(3, 3) +
        '-' +
        rawPhone.substr(6);
    } else {
      formattedPhone =
        countryCallingCode +
        '(' +
        rawPhone.substr(0, 3) +
        ') ' +
        rawPhone.substr(3, 3) +
        '-' +
        rawPhone.substr(6, 2) +
        '-' +
        rawPhone.substr(8, 2);
    }

    // model.setters.setPhone(rawPhone);
    model.setters.setDisplayPhone(formattedPhone);
    model.setters.setInternationalPhone(countryCallingCode + rawPhone);
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
    // model.setters.setPhone('');
    model.setters.setDisplayPhone('');
    model.setters.setInternationalPhone('');
    model.setters.setEmail('');
    model.setters.setPassword('');
    model.setters.setVerifyPassword('');
  };

  const signUpLabelPressHandler = () => {
    model.setters.setMode('signUp');
    model.setters.setShowError(false);
    // model.setters.setPhone('');
    model.setters.setDisplayPhone('');
    model.setters.setInternationalPhone('');
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
