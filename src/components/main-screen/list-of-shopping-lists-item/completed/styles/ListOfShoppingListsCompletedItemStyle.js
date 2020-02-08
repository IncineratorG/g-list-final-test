import {StyleSheet} from 'react-native';

export const listOfShoppingListsCompletedItemStyle = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },
  completionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  completionNotFinished: {
    marginLeft: 20,
    marginRight: 10,
    marginTop: 7,
    marginBottom: 7,
    fontSize: 14,
    color: 'grey',
  },

  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    elevation: 3,
  },
  mainContainerTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 0,
    // marginLeft: 7,
    // marginRight: 7,
    marginBottom: 7,
    borderRadius: 7,
    flexDirection: 'row',
  },
  nameContainer: {
    // flex: 1,
    height: 50,
    // justifyContent: 'center',
  },
  nameNotFinished: {
    marginTop: 7,
    marginLeft: 7,
    marginRight: 7,
    fontSize: 18,
    color: '#424242',
  },
  statusContainer: {
    width: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  statusNotFinished: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 6,
    marginRight: 10,
  },
  statusFinished: {
    width: 30,
    height: 30,
    backgroundColor: '#41D8B1',
    borderRadius: 15,
    elevation: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checmarkIcon: {
    transform: [{scale: 0.7}],
  },
  nameFinished: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 18,
    color: '#D3D3D3',
    textDecorationLine: 'line-through',
  },
});
