import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

export const ListTypeItem = ({item, selectedListType, onSelectListType}) => {
  const itemPressHandler = () => {
    if (onSelectListType) {
      onSelectListType(item.type);
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.touchable}
      // underlayColor={'grey'}
      onPress={itemPressHandler}>
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor:
              selectedListType === item.type ? 'lightgrey' : '#edeef1',
          },
        ]}>
        <Text style={styles.typeTitle}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: 'lightgrey',
    margin: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  typeTitle: {
    margin: 5,
  },
});
