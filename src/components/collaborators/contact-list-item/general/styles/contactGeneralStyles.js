import {StyleSheet} from 'react-native';

export const contactGeneralStyles = StyleSheet.create({
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    height: 30,
    width: 30,
    backgroundColor: 'yellow',
    elevation: 6,
    borderRadius: 15,
  },
  selectButtonChecking: {
    height: 30,
    width: 30,
    backgroundColor: 'grey',
    elevation: 6,
    borderRadius: 15,
  },
  selectButtonExist: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    elevation: 6,
    borderRadius: 15,
  },
  selectButtonNotExist: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    elevation: 6,
    borderRadius: 15,
  },
  selectButtonSelected: {
    height: 30,
    width: 30,
    backgroundColor: '#41D8B1',
    elevation: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    transform: [{scale: 1.0}],
  },
  statusIconSelected: {
    transform: [{scale: 0.7}],
  },
});
