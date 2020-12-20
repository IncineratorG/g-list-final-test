import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';

const PaymentTypesListItem = () => {
  // return <View style={styles.mainContainer} />;

  const itemPressHandler = () => {};

  let typeNameComponent = (
    <Text style={[styles.typeTitle]}>{'Электроэнергия'}</Text>
  );

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      onPress={itemPressHandler}>
      <View style={[styles.mainContainer]}>{typeNameComponent}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    margin: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  typeTitle: {
    margin: 5,
  },
});

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: 40,
//     width: 100,
//     backgroundColor: 'green',
//   },
// });

export default PaymentTypesListItem;
