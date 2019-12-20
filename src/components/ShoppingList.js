/* Компонент, отображающий список покупок на экране списка покупок.
 * */

import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ShoppingListItem from './ShoppingListItem';

export default class ShoppingList extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          style={styles.list}
          data={this.props.list}
          renderItem={({item}) => {
            return <ShoppingListItem listItem={item} />;
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
