import React, {useCallback} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

const ApartmentsListItem = ({apartment, onPress}) => {
  const {name} = apartment;

  const apartmentPressHandler = useCallback(() => {
    if (onPress) {
      onPress({apartment});
    }
  }, [apartment, onPress]);

  const removeApartmentPressHandler = useCallback(() => {
    console.log('removeApartmentPressHandler()');
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TouchableHighlight
        style={styles.mainContainerTouchable}
        underlayColor="#e7e7e7"
        onPress={apartmentPressHandler}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text>{name}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              style={styles.removeButtonTouchable}
              underlayColor="#e7e7e7"
              onPress={removeApartmentPressHandler}>
              <View />
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    elevation: 3,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  mainContainerTouchable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'lightgrey',
  },
  textContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    padding: 8,
  },
  buttonsContainer: {
    // backgroundColor: 'red',
    width: 50,
  },
  removeButtonTouchable: {
    flex: 1,
  },
});

function comparator(prevProps, nextProps) {
  const {apartment: prevApartment, onPress: prevOnPressHandler} = prevProps;
  const {apartment: nextApartment, onPress: nextOnPressHandler} = nextProps;

  const prevApartmentId = prevApartment ? prevApartment.id : -1;
  const prevApartmentName = prevApartment ? prevApartment.name : '';

  const nextApartmentId = nextApartment ? nextApartment.id : -1;
  const nextApartmentName = nextApartment ? nextApartment.name : -1;

  return (
    prevApartmentId === nextApartmentId &&
    prevApartmentName === nextApartmentName &&
    prevOnPressHandler === nextOnPressHandler
  );
}

export default React.memo(ApartmentsListItem, comparator);
