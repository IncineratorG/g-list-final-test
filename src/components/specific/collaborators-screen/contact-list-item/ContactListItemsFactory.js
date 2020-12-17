import React from 'react';
import {contactSelectedStyles} from './selected/styles/contactSelectedStyles';
import {contactNotSelectedStyles} from './not-selected/styles/contactNotSelectedStyles';
import {contactExtraStyles} from './extra/styles/contactExtraStyles';
import {ContactSelected} from './selected/ContactSelected';
import {ContactNotSelected} from './not-selected/ContactNotSelected';
import {ContactExtra} from './extra/ContactExtra';
import {contactGeneralStyles} from './general/styles/contactGeneralStyles';
import {ContactGeneral} from './general/ContactGeneral';

export default class ContactListItemsFactory {
  static get(listItem, index, onSelectPress) {
    const generalStyles = contactGeneralStyles;
    const selectedStyles = contactSelectedStyles;
    const notSelectedStyles = contactNotSelectedStyles;
    const extraStyles = contactExtraStyles;

    const generalContact = (
      <ContactGeneral
        styles={generalStyles}
        listItem={listItem}
        onSelectPress={onSelectPress}
      />
    );

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
    // const listItemChecking =
    //   listItem.status === Collaboration.collaboratorStatus.UNKNOWN;
    // const listItemExist =
    //   listItem.status === Collaboration.collaboratorStatus.EXIST;
    // const listItemNotExist =
    //   listItem.status === Collaboration.collaboratorStatus.NOT_EXIST;

    if (listItemExtra) {
      return extraContact;
    } else {
      return generalContact;
    }
  }
}
