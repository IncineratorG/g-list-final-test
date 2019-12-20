/* Компонент, отображающий элемент списка покупок на экране списка покупок.
 * */

import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {icons} from '../assets/icons';

export default class ShoppingListItem extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.majorInfoContainer}>
            <View style={styles.productNameContainer} />
            <View style={styles.quantityContainer}>
              <View style={styles.quantityCountContainer} />
              <View style={styles.quantityUnitContainer} />
            </View>
          </View>
          <View style={styles.noteContainer} />
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusNotFinished} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'red',
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
  // контэйнер, в кот-ом распологается название продукта, кол-во и примечание.
  infoContainer: {},
  // конт-р, в котором распологается название продукта, кол-во.
  majorInfoContainer: {},
  // конт-р, в котором распологается название продукта.
  productNameContainer: {},
  // конт-р, в котором распологается кол-во и ед-ца измерения продукта.
  quantityContainer: {},
  // конт-р, в котором распологается кол-во продукта.
  quantityCountContainer: {},
  // конт-р, в котором распологается ед-ца измерения продукта.
  quantityUnitContainer: {},
  // конт-р, в котором распологается примечание к продукту.
  noteContainer: {},
});
