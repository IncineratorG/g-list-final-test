/* Компонент, который отображается при отсутствии данных списка покупок на экране списка покупок.
 * */

import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {icons} from '../assets/icons';

export const EmptyShoppingListScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.emptyIconContainer}>
        <Image style={styles.emptyIcon} source={icons.cartWithArrow} />
      </View>
      <View style={styles.emptyTextContainer}>
        <Text style={styles.emptyHeaderText}>Список пуст</Text>
        <Text style={styles.emptyExplanationText}>
          Добавьте сюда то, что вы планируете купить
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyIconContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  emptyIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  emptyTextContainer: {
    margin: 23,
    alignItems: 'center',
  },
  emptyHeaderText: {
    fontSize: 24,
    textAlign: 'center',
  },
  emptyExplanationText: {
    marginTop: 7,
    fontSize: 19,
    textAlign: 'center',
  },
});
