import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {DrawerItems} from 'react-navigation-drawer';

const DrawerMenu = props => {
  const {items, ...rest} = props;
  const filteredItems = items.filter(item => item.key !== 'Main');

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={{flex: 1, height: 200, backgroundColor: 'yellow'}} />
        <DrawerItems items={filteredItems} {...rest} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerMenu;
