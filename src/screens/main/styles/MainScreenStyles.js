import {StyleSheet} from 'react-native';

export const mainScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edeef1',
  },
  addShoppingListButton: {},
  addShoppingListButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
    zIndex: 10,
  },
  emptyMainScreenContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 83,
  },
  listOfShoppingListContainer: {
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
});