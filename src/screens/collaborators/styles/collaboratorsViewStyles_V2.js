import {StyleSheet} from 'react-native';

export const collaboratorsViewStyles_V2 = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#edeef1',

    justifyContent: 'center',
    alignItems: 'center',
  },
  contactsListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  bottomGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
  },
  addContactButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
    zIndex: 10,
  },
  addContactButton: {},
});
