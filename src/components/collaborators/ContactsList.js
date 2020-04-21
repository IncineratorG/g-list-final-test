import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import ContactListItemsFactory from './contact-list-item/ContactListItemsFactory';

export const ContactsList = () => {
  const contacts = [];
  contacts.push({id: 1, email: 'one@one.ru'});
  contacts.push({id: 2, email: 'two@two.ru'});
  contacts.push({id: 3, email: 'three@three.com'});
  contacts.push({id: 4, email: 'alexander.v.dorokhov@yandex.ru'});
  contacts.push({id: 5, email: 'one@one.ru'});
  contacts.push({id: 6, email: 'two@two.ru'});
  contacts.push({id: 7, email: 'three@three.com'});
  contacts.push({id: 8, email: 'alexander.v.dorokhov@yandex.ru'});
  contacts.push({id: 9, email: 'one@one.ru'});
  contacts.push({id: 10, email: 'two@two.ru'});
  contacts.push({id: 11, email: 'three@three.com'});
  contacts.push({id: 12, email: 'alexander.v.dorokhov@yandex.ru'});
  contacts.push({id: 13, email: 'one@one.ru'});
  contacts.push({id: 14, email: 'two@two.ru'});
  contacts.push({id: 15, email: 'three@three.com'});
  contacts.push({id: 16, email: 'alexander.v.dorokhov@yandex.ru'});
  contacts.push({id: Number.MAX_SAFE_INTEGER, email: '', extra: true});

  const onSelectButtonPressHandler = () => {
    console.log('onSelectButtonPressHandler()');
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        stlye={styles.contactsList}
        data={contacts}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return ContactListItemsFactory.get(
            item,
            index,
            onSelectButtonPressHandler,
          );
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
