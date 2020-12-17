import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AddButton} from '../../../components/common/AddButton';
import ApartmentsList from '../../../components/specific/apartments-screen/apartments-list/ApartmentsList';

const ApartmentsView = ({model, controller}) => {
  const {
    data: {apartmentsList},
  } = model;

  const {addApartmentButtonHandler, apartmentPressHandler} = controller;

  const apartmentsListComponent = (
    <View style={styles.apartmentsListContainer}>
      <ApartmentsList
        apartmentsList={apartmentsList}
        onApartmentPress={apartmentPressHandler}
      />
    </View>
  );

  const addApartmentButtonComponent = (
    <View style={styles.addApartmentButtonContainer}>
      <AddButton visible={true} onClick={addApartmentButtonHandler} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {apartmentsListComponent}
      {addApartmentButtonComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  addApartmentButtonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
    zIndex: 10,
    // backgroundColor: 'green',
  },
  apartmentsListContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: 'purple',
  },
});

export default ApartmentsView;
