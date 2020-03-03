import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import {signOut} from '../../../store/actions/authenticationActions';
import SignButton from './components/SignButton';
import SignInfoComponent from './components/SignInfoComponent';

const DrawerMenu = props => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const signedIn = useSelector(
    state => state.authentication.currentUser.signedIn,
  );
  const phone = useSelector(state => state.authentication.currentUser.phone);

  const signInPressHandler = () => {
    navigation.navigate('Authentication', {
      destinationScreen: 'Main',
    });
  };

  const signOutPressHandler = () => {
    dispatch(signOut());
  };

  const signButton = signedIn ? (
    <SignButton title={'Выйти'} onPress={signOutPressHandler} />
  ) : (
    <SignButton title={'Войти'} onPress={signInPressHandler} />
  );

  const signInfo = signedIn ? <SignInfoComponent phone={phone} /> : null;

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.infoContainer}>{signInfo}</View>
        {signButton}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    height: 200,
    backgroundColor: 'yellow',
    padding: 8,
  },
  container: {
    flex: 1,
  },
});

export default DrawerMenu;

// const {items, ...rest} = props;
// const filteredItems = items.filter(item => item.key !== 'Main');
// let filteredItems = [];
// if (!signedIn) {
//   filteredItems = items.filter(item => item.key !== 'Main');
// }
