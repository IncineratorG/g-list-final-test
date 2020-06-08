import React from 'react';
import {View, TouchableHighlight, TextInput} from 'react-native';

const SelectCategoryColorView = ({styles, model, controller}) => {
  const handler = () => {
    console.log('handler');
  };

  return (
    <View
      style={{
        backgroundColor: 'yellow',
        alignSelf: 'stretch',
        height: 150,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <TextInput autoFocus={true} />
    </View>
  );
};

export default SelectCategoryColorView;
