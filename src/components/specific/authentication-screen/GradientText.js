import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';

export const GradientText = ({text, colors, onPress}) => {
  if (!text) {
    text = 'Text';
  }

  if (!colors || colors.length <= 0) {
    colors = ['black'];
  }

  const backgroundComponent = colors.map(color => (
    <View
      key={color}
      style={[styles.backgroundComponent, {backgroundColor: color}]}
    />
  ));

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Text style={styles.underlayText}>{text}</Text>
        <MaskedView
          style={styles.maskedView}
          maskElement={
            <View style={styles.maskedTextContainer}>
              <Text style={styles.maskedText}>{text}</Text>
            </View>
          }>
          {backgroundComponent}
        </MaskedView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  underlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'transparent',
    padding: 0,
  },
  maskedView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  maskedTextContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  maskedText: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
  },
  backgroundComponent: {
    flex: 1,
    height: '100%',
  },
});
