import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ApartmentsListItem from './item/ApartmentsListItem';

const ApartmentsList = ({apartmentsList, onApartmentPress}) => {
  const keyExtractor = useCallback(item => {
    return item.id;
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return <ApartmentsListItem apartment={item} onPress={onApartmentPress} />;
    },
    [onApartmentPress],
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={apartmentsList}
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

export default ApartmentsList;
