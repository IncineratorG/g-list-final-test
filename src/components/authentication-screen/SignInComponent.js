import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {icons} from '../../assets/icons';

export const SignInComponent = ({
  phone,
  email,
  password,
  phoneHandler,
  emailHandler,
  passwordHandler,
}) => {
  return (
    <LinearGradient
      style={styles.mainContainer}
      colors={['#0072e5', '#00a9f4']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.emailOuterContainer}>
        <View style={styles.emailInnerContainer}>
          <View style={styles.emailIconContainer}>
            <Image style={styles.emailIcon} source={icons.email} />
          </View>
          <View style={styles.emailInputContainer}>
            <TextInput
              style={styles.emailTextInput}
              placeholder={'user@usermail.com'}
              spellCheck={false}
              autoCapitalize={'none'}
              value={email}
              onChangeText={emailHandler}
            />
          </View>
        </View>
      </View>
      <View style={styles.passwordOuterContainer}>
        <View style={styles.passwordInnerContainer}>
          <View style={styles.passwordIconContainer}>
            <Image style={styles.passwordIcon} source={icons.password} />
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordTextInput}
              placeholder={'пароль'}
              spellCheck={false}
              autoCapitalize={'none'}
              secureTextEntry={true}
              value={password}
              onChangeText={passwordHandler}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 82,
    backgroundColor: '#0086ea',
    borderRadius: 8,
    elevation: 8,
  },
  phoneOuterContainer: {
    flex: 1,
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  phoneInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  phoneIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  phoneIcon: {
    transform: [{scale: 0.5}],
  },
  phoneInputContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  phoneTextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  emailOuterContainer: {
    flex: 1,
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  emailInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  emailIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  emailIcon: {
    transform: [{scale: 0.5}],
  },
  emailInputContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  emailTextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  passwordOuterContainer: {
    flex: 1,
    padding: 4,
  },
  passwordInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  passwordIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  passwordIcon: {
    transform: [{scale: 0.5}],
  },
  passwordInputContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  passwordTextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
});
