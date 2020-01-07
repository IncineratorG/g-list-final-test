// Кнопка применяемая для подтверждения действий

import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {icons} from '../../assets/icons';

export const ConfirmButton = ({onClick}) => {
  // render() {
  //   return (
  //       <View style={styles.mainContainer}>
  //     <TouchableHighlight
  //       style={styles.touchable}
  //       onPress={() => {
  //         if (this.props.onClick !== undefined) {
  //           this.props.onClick();
  //         }
  //       }}>
  //       <View style={styles.imageContainer}>
  //         <Image style={styles.crossIcon} source={icons.checkmark} />
  //       </View>
  //     </TouchableHighlight>
  //       </View>
  //   );
  // }

  return (
    <View style={styles.mainContainer}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => {
          if (onClick !== undefined) {
            onClick();
          }
        }}>
        <View style={styles.imageContainer}>
          <Image style={styles.crossIcon} source={icons.checkmark} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    height: 50,
    alignSelf: 'stretch',
    borderRadius: 8,
  },
  touchable: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 8,
  },
  imageContainer: {
    backgroundColor: '#41D8B1',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 8,
  },
  crossIcon: {
    transform: [{scale: 1.5}],
  },

  // mainContainer: {
  //     backgroundColor: '#41D8B1',
  //     height: 75,
  //     alignSelf: 'stretch',
  //     // width: 700,
  //     borderRadius: 38,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     elevation: 8,
  // },
  // crossIcon: {
  //   transform: [{scale: 1.5}],
  // },
  // touchable: {
  //   flex: 1,
  //     alignSelf: 'stretch',
  //   borderRadius: 38,
  // },
  //   imageContainer: {
  //   },
});
