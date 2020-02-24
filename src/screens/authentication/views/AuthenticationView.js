import React from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import {AuthenticationButton} from '../../../components/authentication-screen/AuthenticationButton';
import {SignUpComponent} from '../../../components/authentication-screen/SignUpComponent';
import {SignInComponent} from '../../../components/authentication-screen/SignInComponent';
import {GradientText} from '../../../components/authentication-screen/GradientText';
import {ScrollView} from 'react-navigation';

const AuthenticationView = ({styles, model, controller}) => {
  const {mode, email, password, verifyPassword, keyboardVisible} = model;

  const {
    signInButtonHandler,
    signUpButtonHandler,
    emailInputHandler,
    passwordInputHandler,
    verifyPasswordInputHandler,
    signInLabelPressHandler,
    signUpLabelPressHandler,
  } = controller;

  console.log('KEYBOARD_VISIBLE: ' + keyboardVisible);

  const signInLabelComponent = (
    <View style={styles.modeSignInTextContainer}>
      <GradientText
        text={'Вход'}
        colors={
          mode === 'signIn'
            ? ['#0072e5', '#0086ea', '#0098ef', '#00a9f4']
            : ['lightgrey']
        }
        onPress={signInLabelPressHandler}
      />
    </View>
  );

  const signUpLabelComponent = (
    <View style={styles.modeSignUpTextContainer}>
      <GradientText
        text={'Регистрация'}
        colors={
          mode === 'signUp'
            ? ['#0072e5', '#0086ea', '#0098ef', '#00a9f4']
            : ['lightgrey']
        }
        onPress={signUpLabelPressHandler}
      />
    </View>
  );

  const inputsComponent =
    mode === 'signUp' ? (
      <SignUpComponent
        email={email}
        password={password}
        verifyPassword={verifyPassword}
        emailHandler={emailInputHandler}
        passwordHandler={passwordInputHandler}
        verifyPasswordHandler={verifyPasswordInputHandler}
      />
    ) : (
      <SignInComponent
        email={email}
        password={password}
        emailHandler={emailInputHandler}
        passwordHandler={passwordInputHandler}
      />
    );

  const buttonComponent =
    mode === 'signUp' ? (
      <AuthenticationButton
        title={'Регистрация'}
        onPress={signUpButtonHandler}
      />
    ) : (
      <AuthenticationButton title={'Вход'} onPress={signInButtonHandler} />
    );

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.modeContainer}>
        {signInLabelComponent}
        {signUpLabelComponent}
      </View>
      <View style={styles.inputAreaContainer}>
        <View style={styles.inputsContainer}>{inputsComponent}</View>
        <View style={styles.buttonContainer}>{buttonComponent}</View>
      </View>
    </ScrollView>
  );
};

export default AuthenticationView;
