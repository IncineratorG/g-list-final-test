import React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {icons} from '../../assets/icons';

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
        <View style={styles.smsIconContainer}>
          <Image style={styles.smsIcon} source={icons.sms} />
        </View>
        <Text>Sms</Text>
      </View>
    </TouchableHighlight>
  ) : null;

  const whatsAppButton = whatsAppAvailable ? (
    <TouchableHighlight
      style={styles.whatsAppTouchable}
      onPress={whatsAppPressHandler}>
      <View style={styles.whatsAppButton}>
        <View style={styles.whatsAppIconContainer}>
          <Image style={styles.whatsAppIcon} source={icons.whatsapp} />
        </View>
        <Text style={styles.whatsAppText}>WhatsApp</Text>
      </View>
    </TouchableHighlight>
  ) : null;

  return (
    <View style={styles.mainContainer}>
      {smsButton}
      {whatsAppButton}
    </View>
  );
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
    // justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  smsIconContainer: {
    width: 20,
    height: 20,
    // backgroundColor: '#FAFAFA',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smsIcon: {
    transform: [{scale: 0.7}],
  },
  whatsAppTouchable: {
    borderRadius: 10,
    marginRight: 8,
  },
  whatsAppButton: {
    // backgroundColor: '#25d366',
    backgroundColor: 'lightgrey',
    height: 30,
    width: 120,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    // marginRight: 8,
  },
  whatsAppIconContainer: {
    width: 20,
    height: 20,
    // backgroundColor: 'red',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsAppText: {
    color: 'black',
  },
  whatsAppIcon: {
    transform: [{scale: 0.55}],
  },
});
