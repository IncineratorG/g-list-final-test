import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';

export const ListTypesList = ({types, selectedListType}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={types}
        horizontal={true}
        activeOpacity={1}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.typeItemMainContainer}>
              <Text style={styles.typeTitle}>{item.title}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.type.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  typeItemMainContainer: {
    backgroundColor: 'lightgrey',
    margin: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeTitle: {
    margin: 5,
  },
});
