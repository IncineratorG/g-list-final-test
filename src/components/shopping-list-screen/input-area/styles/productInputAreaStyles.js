import {StyleSheet} from 'react-native';

export const productInputAreaStyles = StyleSheet.create({
  inputAreaContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  categoriesContainer: {
    height: 50,
    // zIndex: 100,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    alignSelf: 'stretch',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  textInputIconContainer: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginLeft: 10,
  },
  textInputIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  textInputOptionsContainer: {
    backgroundColor: 'green',
    height: 30,
    width: 100,
    alignSelf: 'center',
    // marginRight: 10,
  },
  acceptInputTouchable: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginRight: 10,
    borderRadius: 4,
  },
  acceptInputContainer: {
    backgroundColor: '#304FFE',
    height: 30,
    width: 30,
    alignSelf: 'center',
    padding: 4,
    borderRadius: 4,
  },
  acceptInputIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  inputOptionsContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  productNameOptionButtonContainer: {},
  quantityOptionButtonContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  categoryOptionButtonContainer: {
    marginRight: 10,
  },
  noteOptionButtonContainer: {},
});
