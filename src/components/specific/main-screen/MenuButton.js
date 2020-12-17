import React from 'react';
import {View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {icons} from '../../../assets/icons';

const MenuButton = ({onPress}) => {
  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={'grey'}
      onPress={onPress}>
      <View style={styles.mainContainer}>
        <Image style={styles.menuIcon} source={icons.menu} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    transform: [{scale: 0.5}],
  },
  touchable: {},
});

export default MenuButton;
