import {StyleSheet} from 'react-native';

export const shoppingListItemStylesCompleted = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 7,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  touchable: {
    flex: 1,
    marginTop: 7,
  },
  statusContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  statusTouchable: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  statusFinished: {
    width: 30,
    height: 30,
    backgroundColor: '#41D8B1',
    borderRadius: 15,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 10,
  },
  checmarkIcon: {
    transform: [{scale: 0.7}],
  },
  // контэйнер, в кот-ом распологается название продукта, кол-во и примечание.
  infoContainer: {
    flex: 1,
    // backgroundColor: 'gold',
    alignSelf: 'stretch',
  },
  // конт-р, в котором распологается название продукта, кол-во.
  majorInfoContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    // backgroundColor: 'cyan',
  },
  // конт-р, в котором распологается название продукта.
  productNameContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  // стиль для названия продукта
  productName: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 18,
    color: '#D3D3D3',
    textDecorationLine: 'line-through',
  },
  // конт-р, в котором распологается кол-во и ед-ца измерения продукта.
  quantityContainer: {
    alignSelf: 'stretch',
    width: 70,
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  // конт-р, в котором распологается кол-во продукта.
  quantityCountContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'orange',
  },
  // строка с кол-вом продукта
  quantityCount: {
    marginLeft: 2,
    marginRight: 2,
    fontSize: 18,
    color: '#D3D3D3',
    textDecorationLine: 'line-through',
  },
  // конт-р, в котором распологается ед-ца измерения продукта.
  quantityUnitContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  // строка с единицей измерения кол-ва продукта
  quantityUnit: {
    // marginLeft: 8,
    marginRight: 2,
    fontSize: 18,
    color: '#D3D3D3',
    textDecorationLine: 'line-through',
  },
  // конт-р, в котором распологается примечание к продукту.
  noteContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
  },
  note: {
    margin: 4,
    color: '#D3D3D3',
    textDecorationLine: 'line-through',
  },
});
