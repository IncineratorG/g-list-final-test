import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ApartmentPaymentsListItem from './item/ApartmentPaymentsListItem';

const ApartmentPaymentsList = ({paymentsList, onPaymentPress}) => {
  const keyExtractor = useCallback(item => {
    return item.id.toString();
  }, []);

  const renderItem = useCallback(({item}) => {
    return <ApartmentPaymentsListItem />;
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={paymentsList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'yellow',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  list: {
    flex: 1,
    paddingTop: 8,
  },
});

export default ApartmentPaymentsList;
