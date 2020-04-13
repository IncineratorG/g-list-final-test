import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SignInfoComponent = ({phone, email}) => {
  if (!phone) {
    phone = '12345678';
  }
  if (!email) {
    email = 'example@mail.com';
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.phoneInfoContainer}>
        <View style={styles.phoneTitleContainer}>
          <Text style={styles.phoneTitle}>Email</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.phone}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  phoneInfoContainer: {},
  phoneTitleContainer: {},
  phoneTitle: {},
  phoneContainer: {},
  phone: {},
});

export default SignInfoComponent;
