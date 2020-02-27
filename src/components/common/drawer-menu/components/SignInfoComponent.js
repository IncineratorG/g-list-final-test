import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SignInfoComponent = ({phone}) => {
  if (!phone) {
    phone = '12345678';
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.phoneInfoContainer}>
        <View style={styles.phoneTitleContainer}>
          <Text style={styles.phoneTitle}>Телефон</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Text style={styles.phone}>{phone}</Text>
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
