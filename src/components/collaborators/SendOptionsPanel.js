import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export const SendOptionsPanel = ({
  onSmsPress,
  onWhatsAppPress,
  smsAvailable,
  whatsAppAvailable,
}) => {
  const smsPressHandler = () => {
    if (onSmsPress) {
      onSmsPress();
    }
  };

  const whatsAppPressHandler = () => {
    if (onWhatsAppPress) {
      onWhatsAppPress();
    }
  };

  const smsButton = smsAvailable ? (
    <TouchableHighlight style={styles.smsTouchable} onPress={smsPressHandler}>
      <View style={styles.smsButton}>
        <Text>Sms</Text>
      </View>
    </TouchableHighlight>
  ) : null;

  const whatsAppButton = whatsAppAvailable ? (
    <TouchableHighlight
      style={styles.whatsAppTouchable}
      onPress={whatsAppPressHandler}>
      <View style={styles.whatsAppButton}>
        <Text>WhatsApp</Text>
      </View>
    </TouchableHighlight>
  ) : null;

  return (
    <View style={styles.mainContainer}>
      {smsButton}
      {whatsAppButton}
    </View>
  );

  // return (
  //   <View style={styles.mainContainer}>
  //     <TouchableHighlight style={styles.smsTouchable} onPress={smsPressHandler}>
  //       <View style={styles.smsButton}>
  //         <Text>Sms</Text>
  //       </View>
  //     </TouchableHighlight>
  //     <TouchableHighlight
  //       style={styles.whatsAppTouchable}
  //       onPress={whatsAppPressHandler}>
  //       <View style={styles.whatsAppButton}>
  //         <Text>WhatsApp</Text>
  //       </View>
  //     </TouchableHighlight>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
  },
  smsTouchable: {
    borderRadius: 10,
  },
  smsButton: {
    backgroundColor: 'lightgrey',
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  whatsAppTouchable: {
    borderRadius: 10,
    marginRight: 8,
  },
  whatsAppButton: {
    backgroundColor: 'lightgrey',
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginRight: 8,
  },
});
