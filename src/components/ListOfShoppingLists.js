/* Компонент, отображающий список списков покупок на стартовом экране.
 * */

import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ListOfShoppingListsItem from './ListOfShoppingListsItem';

export default class ListOfShoppingLists extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          style={styles.list}
          data={this.props.list}
          renderItem={({item}) => {
            return <ListOfShoppingListsItem listItem={item} />;
          }}
          keyExtractor={item => item.id}
        />
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
  },
  list: {
    flex: 1,
  },
});
