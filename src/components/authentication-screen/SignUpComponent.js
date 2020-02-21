import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {icons} from '../../assets/icons';

export const SignUpComponent = () => {
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
          <View style={styles.emailInputContainer} />
        </View>
      </View>
      <View style={styles.passwordOuterContainer}>
        <View style={styles.passwordInnerContainer}>
          <View style={styles.passwordIconContainer}>
            <Image style={styles.passwordIcon} source={icons.password} />
          </View>
          <View style={styles.passwordInputContainer} />
        </View>
      </View>
      <View style={styles.passwordConfirmationOuterContainer}>
        <View style={styles.passwordConfirmationInnerContainer}>
          <View style={styles.passwordConfirmationIconContainer}>
            <Image
              style={styles.passwordConfirmationIcon}
              source={icons.verify_password}
            />
          </View>
          <View style={styles.passwordConfirmationInputContainer} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 150,
    backgroundColor: '#0086ea',
    borderRadius: 4,
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
  passwordOuterContainer: {
    flex: 1,
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
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
  passwordConfirmationOuterContainer: {
    flex: 1,
    padding: 4,
  },
  passwordConfirmationInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  passwordConfirmationIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  passwordConfirmationIcon: {
    transform: [{scale: 0.6}],
  },
  passwordConfirmationInputContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});
