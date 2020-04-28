import {StyleSheet} from 'react-native';

export const listOfShoppingListsItemStylesGeneral = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 8,
    borderRadius: 4,
    elevation: 3,
    marginLeft: 8,
    marginRight: 8,
  },
  bodyContainerTouchable: {
    borderRadius: 4,
  },
  bodyContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  listNameContainer: {
    flex: 1,
  },
  listName: {
    fontSize: 18,
    color: '#424242',
    margin: 8,
  },
  completionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionValue: {
    fontSize: 18,
    color: 'grey',
    margin: 8,
  },
  menuTouchable: {
    width: 50,
    height: 50,
    // borderRadius: 25,
  },
  menuContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  menuIcon: {},
  footerContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  footerSeparationLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 4,
    marginRight: 4,
  },
  collaboratorsContainer: {
    flex: 1,
  },
  menuComponent: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
    marginTop: 10,
    marginRight: 10,
  },
});
