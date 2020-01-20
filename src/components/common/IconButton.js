import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, Image} from 'react-native';
import {icons} from '../../assets/icons';

export const IconButton = ({onPress, label, icon}) => {
  if (!label) {
    label = 'Button';
  }

  if (!icon) {
    icon = icons.empty;
  }

  return (
    <TouchableHighlight
      style={styles.touchable}
      underlayColor={'black'}
      onPress={() => {
        if (onPress !== undefined) {
          onPress();
        }
      }}>
      <View style={[styles.mainContainer, {display: 'flex'}]}>
        <View style={styles.iconContainer}>
          <Image style={styles.icon} source={icon} />
        </View>
        <Text
          style={{
            flex: 1,
            color: 'black',
            fontSize: 16,
            marginLeft: 5,
            marginRight: 5,
          }}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#CCCCCC',
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 8,
  },
  touchable: {
    borderRadius: 4,
  },
  iconContainer: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});
