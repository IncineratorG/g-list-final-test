import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ContactListItemsFactory from './contact-list-item/ContactListItemsFactory';

export const ContactsList = ({list, onSelectContactPress}) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        stlye={styles.contactsList}
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return ContactListItemsFactory.get(item, index, onSelectContactPress);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    flex: 1,
    backgroundColor: 'green',
  },
  mainContainer: {
    flex: 1,
  },
  contactsList: {
    flex: 1,
  },
});
