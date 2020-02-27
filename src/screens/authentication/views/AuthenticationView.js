import React from 'react';
import {View, Text} from 'react-native';
import {AuthenticationButton} from '../../../components/authentication-screen/AuthenticationButton';
import {SignUpComponent} from '../../../components/authentication-screen/SignUpComponent';
import {SignInComponent} from '../../../components/authentication-screen/SignInComponent';
import {GradientText} from '../../../components/authentication-screen/GradientText';
import {ScrollView} from 'react-navigation';
import {ProgressDialog} from 'react-native-simple-dialogs';

const AuthenticationView = ({styles, model, controller}) => {
  const {
    mode,
    phone,
    email,
    password,
    verifyPassword,
    signing,
    errorText,
    showError,
  } = model;

  const {
    signInButtonHandler,
    signUpButtonHandler,
    phoneInputHandler,
    emailInputHandler,
    passwordInputHandler,
    verifyPasswordInputHandler,
    signInLabelPressHandler,
    signUpLabelPressHandler,
  } = controller;

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
        phone={phone}
        email={email}
        password={password}
        verifyPassword={verifyPassword}
        phoneHandler={phoneInputHandler}
        emailHandler={emailInputHandler}
        passwordHandler={passwordInputHandler}
        verifyPasswordHandler={verifyPasswordInputHandler}
      />
    ) : (
      <SignInComponent
        phone={phone}
        email={email}
        password={password}
        phoneHandler={phoneInputHandler}
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

  const signingDialog =
    mode === 'signIn' ? (
      <ProgressDialog
        visible={signing}
        title={'Вход в аккаунт'}
        message={'Подождите'}
      />
    ) : (
      <ProgressDialog
        visible={signing}
        title={'Регистрация'}
        message={'Подождите'}
      />
    );

  const errorComponent = showError ? (
    <View>
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  ) : (
    <View>
      <Text />
    </View>
  );

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.modeContainer}>
        {signingDialog}
        {signInLabelComponent}
        {signUpLabelComponent}
      </View>
      <View style={styles.inputAreaContainer}>
        {errorComponent}
        <View style={styles.inputsContainer}>{inputsComponent}</View>
        <View style={styles.buttonContainer}>{buttonComponent}</View>
      </View>
    </ScrollView>
  );
};

export default AuthenticationView;
