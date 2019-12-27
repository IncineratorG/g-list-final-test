/* Компонент, отображающий элемент списка покупок на экране списка покупок.
 * */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ShoppingListItemNotFinished} from './ShoppingListItemNotFinished';
import {ShoppingListItemFinished} from './ShoppingListItemFinished';

export const ShoppingListItem = ({listItem}) => {
  const finishedItem = <ShoppingListItemFinished itemToRender={listItem} />;
  const notFinishedItem = (
    <ShoppingListItemNotFinished itemToRender={listItem} />
  );
  // const expandedItem = <ShoppingListItemExpanded />;

  let item = <View />;
  if (listItem.completionStatus === 'finished') {
    item = finishedItem;
  } else if (listItem.completionStatus === 'not-finished') {
    item = notFinishedItem;
  }
  // console.log(this.props.listItem.)

  return item;
};

// render() {
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.infoContainer}>
//         <View style={styles.majorInfoContainer}>
//           <View style={styles.productNameContainer}>
//             <Text
//               style={styles.productName}
//               numberOfLines={1}
//               elipsizeMode="tail">
//               Хлеб
//             </Text>
//           </View>
//           <View style={styles.quantityContainer}>
//             <View style={styles.quantityCountContainer}>
//               <Text style={styles.quantityCount} numberOfLines={1}>
//                 4
//               </Text>
//             </View>
//             <View style={styles.quantityUnitContainer}>
//               <Text style={styles.quantityUnit} numberOfLines={1}>
//                 кг
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.noteContainer}>
//           <Text style={styles.note}>Примечание</Text>
//         </View>
//       </View>
//       <View style={styles.statusContainer}>
//         <View style={styles.statusNotFinished} />
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: 'white',
  },
  statusContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    // backgroundColor: 'green',
  },
  statusNotFinished: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 6,
    // marginRight: 10,
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
    color: 'grey',
  },
});
