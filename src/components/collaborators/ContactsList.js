import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';

export const ContactsList = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>CONTACTS_LIST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
