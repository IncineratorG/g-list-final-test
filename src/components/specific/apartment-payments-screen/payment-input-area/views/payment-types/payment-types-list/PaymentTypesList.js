import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import PaymentTypesListItem from './item/PaymentTypesListItem';

const PaymentTypesList = () => {
  const types = ['1', '2', '3'];

  const renderItem = useCallback(({item}) => {
    return <PaymentTypesListItem />;
  }, []);

  const keyExtractor = useCallback(item => item, []);

  return (
    <View style={style.mainContainer}>
      <FlatList
        data={types}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default PaymentTypesList;
