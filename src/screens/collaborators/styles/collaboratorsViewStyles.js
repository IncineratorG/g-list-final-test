import {StyleSheet} from 'react-native';

export const collaboratorsViewStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 4,
    backgroundColor: 'lightgrey',
  },
  emailInputOuterContainer: {
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  emailInputInnerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  emailInput: {},
  emailInputButtonContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
    // backgroundColor: 'green',
  },
  errorText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'red',
  },
});
