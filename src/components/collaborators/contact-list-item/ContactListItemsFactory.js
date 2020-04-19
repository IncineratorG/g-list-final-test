import React from 'react';
import {contactSelectedStyles} from './selected/styles/contactSelectedStyles';
import {contactNotSelectedStyles} from './not-selected/styles/contactNotSelectedStyles';
import {contactExtraStyles} from './extra/styles/contactExtraStyles';
import {ContactSelected} from './selected/ContactSelected';
import {ContactNotSelected} from './not-selected/ContactNotSelected';
import {ContactExtra} from './extra/ContactExtra';

export default class ContactListItemsFactory {
  static get(listItem, index, onSelectPress) {
    const selectedStyles = contactSelectedStyles;
    const notSelectedStyles = contactNotSelectedStyles;
    const extraStyles = contactExtraStyles;

    const selectedContact = (
      <ContactSelected
        styles={selectedStyles}
        listItem={listItem}
        onSelectPress={onSelectPress}
      />
    );

    const notSelectedContact = (
      <ContactNotSelected
        styles={notSelectedStyles}
        listItem={listItem}
        onSelectPress={onSelectPress}
      />
    );

    const extraContact = (
      <ContactExtra
        styles={extraStyles}
        listItem={listItem}
        onSelectPress={onSelectPress}
      />
    );

    const listItemExtra = listItem.extra;

    if (listItemExtra) {
      return extraContact;
    } else {
      return notSelectedContact;
    }
  }
}
