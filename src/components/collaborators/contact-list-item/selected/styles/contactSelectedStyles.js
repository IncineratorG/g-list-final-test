import {StyleSheet} from 'react-native';

export const contactSelectedStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 7,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  emailContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  email: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8,
  },
  selectButtonContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    height: 30,
    width: 30,
    backgroundColor: 'yellow',
    borderRadius: 15,
  },
});
