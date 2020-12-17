import React, {useCallback} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

const ApartmentPaymentsListItem = ({payments, onPress}) => {
  return <View style={styles.mainContainer} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 50,
    backgroundColor: 'grey',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    elevation: 3,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
});

export default ApartmentPaymentsListItem;
