import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {RegistrationButton} from '../../../components/registration-screen/RegistrationButton';
import {icons} from '../../../assets/icons';

const RegistrationScreen = ({styles, model, controller}) => {
  const {mode, activeLabelColor, nonActiveLabelColor} = model;

  const {
    signInButtonHandler,
    signUpButtonHandler,
    signInLabelPressHandler,
    signUpLabelPressHandler,
  } = controller;

  const passwordConfirmationComponent =
    mode === 'signUp' ? (
      <View style={styles.passwordConfirmationContainer}>
        <TextInput
          style={styles.passwordConfirmationTextInput}
          placeholder={'Verify Password'}
        />
      </View>
    ) : (
      <View style={{height: 69}} />
    );

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior={'height'}>
      <View style={styles.modeContainer}>
        <TouchableWithoutFeedback
          style={styles.signInLabelTouchable}
          onPress={signInLabelPressHandler}>
          <View style={styles.signInLabelContainer}>
            <Text
              style={[
                styles.signInLabel,
                {
                  color:
                    mode === 'signIn' ? activeLabelColor : nonActiveLabelColor,
                },
              ]}>
              Вход
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.signUpLabelTouchable}
          onPress={signUpLabelPressHandler}>
          <View style={styles.signUpLabelContainer}>
            <Text
              style={[
                styles.signUpLabel,
                {
                  color:
                    mode === 'signUp' ? activeLabelColor : nonActiveLabelColor,
                },
              ]}>
              Регистрация
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.inputAreaContainer}>
        <View style={styles.inputsContainer}>
          <View style={styles.emailOuterContainer}>
            <View style={styles.emailInnerContainer}>
              <View style={styles.emailIconContainer}>
                <Image style={styles.emailIcon} source={icons.email} />
              </View>
            </View>
          </View>
          <View style={styles.passwordOuterContainer}>
            <View style={styles.passwordInnerContainer}>
              <View style={styles.passwordIconContainer}>
                <Image style={styles.passwordIcon} source={icons.password} />
              </View>
            </View>
          </View>
          <View style={styles.verifyPasswordOuterContainer}>
            <View style={styles.verifyPasswordInnerContainer}>
              <View style={styles.verifyPasswordIconContainer}>
                <Image style={styles.verifyPasswordIcon} source={icons.cross} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <RegistrationButton />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

// return (
//     <KeyboardAvoidingView style={styles.mainContainer} behavior={'height'}>
//         <View style={styles.modeContainer}>
//             <TouchableWithoutFeedback
//                 style={styles.signInLabelTouchable}
//                 onPress={signInLabelPressHandler}>
//                 <View style={styles.signInLabelContainer}>
//                     <Text
//                         style={[
//                             styles.signInLabel,
//                             {
//                                 color:
//                                     mode === 'signIn' ? activeLabelColor : nonActiveLabelColor,
//                             },
//                         ]}>
//                         Вход
//                     </Text>
//                 </View>
//             </TouchableWithoutFeedback>
//             <TouchableWithoutFeedback
//                 style={styles.signUpLabelTouchable}
//                 onPress={signUpLabelPressHandler}>
//                 <View style={styles.signUpLabelContainer}>
//                     <Text
//                         style={[
//                             styles.signUpLabel,
//                             {
//                                 color:
//                                     mode === 'signUp' ? activeLabelColor : nonActiveLabelColor,
//                             },
//                         ]}>
//                         Регистрация
//                     </Text>
//                 </View>
//             </TouchableWithoutFeedback>
//         </View>
//         <View style={styles.inputAreaContainer}>
//             <View style={styles.emailContainer}>
//                 <TextInput style={styles.emailTextInput} placeholder={'Email'} />
//             </View>
//             <View style={styles.passwordContainer}>
//                 <TextInput
//                     style={styles.passwordTextInput}
//                     placeholder={'Password'}
//                 />
//             </View>
//             {passwordConfirmationComponent}
//             <View style={styles.signInUpButtonContainer}>
//                 <RegistrationButton
//                     title={mode === 'signIn' ? 'Вход' : 'Регистрация'}
//                     onPress={
//                         mode === 'signIn' ? signInButtonHandler : signUpButtonHandler
//                     }
//                 />
//             </View>
//         </View>
//     </KeyboardAvoidingView>
// );

// return (
//   <KeyboardAvoidingView style={styles.mainContainer} behavior={'height'}>
//     <View style={styles.modeContainer}>
//       <TouchableWithoutFeedback
//         style={styles.signInLabelTouchable}
//         onPress={signInLabelPressHandler}>
//         <View style={styles.signInLabelContainer}>
//           <Text
//             style={[
//               styles.signInLabel,
//               {
//                 color:
//                   mode === 'signIn' ? activeLabelColor : nonActiveLabelColor,
//               },
//             ]}>
//             Sign In
//           </Text>
//         </View>
//       </TouchableWithoutFeedback>
//       <TouchableWithoutFeedback
//         style={styles.signUpLabelTouchable}
//         onPress={signUpLabelPressHandler}>
//         <View style={styles.signUpLabelContainer}>
//           <Text
//             style={[
//               styles.signUpLabel,
//               {
//                 color:
//                   mode === 'signUp' ? activeLabelColor : nonActiveLabelColor,
//               },
//             ]}>
//             Sign Up
//           </Text>
//         </View>
//       </TouchableWithoutFeedback>
//     </View>
//     <View style={styles.inputAreaContainer}>
//       <View style={styles.emailContainer}>
//         <TextInput style={styles.emailTextInput} placeholder={'Email'} />
//       </View>
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordTextInput}
//           placeholder={'Password'}
//         />
//       </View>
//       <View style={styles.passwordConfirmationContainer}>
//         <TextInput
//           style={styles.passwordConfirmationTextInput}
//           placeholder={'Verify Password'}
//         />
//       </View>
//       <View style={styles.signInUpButtonContainer}>
//         <Button title={'Button'} />
//       </View>
//     </View>
//     <View style={styles.footerContainer} />
//   </KeyboardAvoidingView>
// );
