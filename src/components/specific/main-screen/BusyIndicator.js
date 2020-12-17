import React, {useRef} from 'react';
import {StyleSheet, Animated} from 'react-native';

const BusyIndicator = ({busy}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const fadeIn = Animated.timing(animation, {
    toValue: 1,
    timing: 400,
    useNativeDriver: true,
  });
  const fadeOut = Animated.timing(animation, {
    toValue: 0,
    duration: 400,
    useNativeDriver: true,
  });

  const runAnimation = isBusy => {
    fadeIn.start(() =>
      fadeOut.start(() => {
        if (isBusy) {
          runAnimation();
        } else {
          fadeOut.start();
        }
      }),
    );
  };

  const animatedStyle = {
    opacity: animation,
  };

  runAnimation(busy);

  if (busy) {
    return <Animated.View style={[styles.mainContainer, animatedStyle]} />;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 5,
    width: 200,
    backgroundColor: '#4a9dec',
  },
});

// export default BusyIndicator;
export default React.memo(BusyIndicator);
