import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListTypeItem} from './ListTypeItem';

export const ListTypesList = ({types, selectedListType, onSelectListType}) => {
  const renderItem = ({item}) => {
    return (
      <ListTypeItem
        item={item}
        selectedListType={selectedListType}
        onSelectListType={onSelectListType}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        inverted={true}
        data={types}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.type.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
