import {StyleSheet} from 'react-native';

export const collaboratorsViewStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: 'lightgrey',
  },
  phoneInputOuterContainer: {
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  phoneInputInnerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  phoneInput: {},
  phoneInputButtonContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsListContainer: {
    flex: 1,
    // backgroundColor: 'green',
  },
  errorText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'red',
  },
});
