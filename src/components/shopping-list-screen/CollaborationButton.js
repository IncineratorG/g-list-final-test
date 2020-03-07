import React from 'react';
import {View, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {icons} from '../../assets/icons';

const CollaborationButton = ({onPress}) => {
  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={'grey'}
      onPress={onPress}>
      <View style={styles.mainContainer}>
        <Image style={styles.syncIcon} source={icons.sync} />
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
  syncIcon: {
    transform: [{scale: 1.2}],
  },
  touchable: {},
});

export default CollaborationButton;
