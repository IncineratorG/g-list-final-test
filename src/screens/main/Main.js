import React, {useEffect} from 'react';
import MainView from './views/MainView';
import {mainViewStyles} from './styles/mainViewStyles';
import {useMainScreenModel} from './models/mainViewModel';
import {useMainScreenController} from './controllers/mainViewController';
import {Image, TouchableHighlight, View} from 'react-native';
import {icons} from '../../assets/icons';

const Main = () => {
  const styles = mainViewStyles;
  const model = useMainScreenModel();
  const controller = useMainScreenController(model);

  const menuButton = (
    <TouchableHighlight
      underlayColor={'grey'}
      onPress={() => {
        console.log('PRESS');

        model.navigation.toggleDrawer();
      }}>
      <View
        style={{
          width: 40,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={{transform: [{scale: 1.2}]}} source={icons.sync} />
      </View>
    </TouchableHighlight>
  );

  useEffect(() => {
    model.navigation.setParams({menuButton});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainView styles={styles} model={model.data} controller={controller} />
  );
};

Main.navigationOptions = ({navigation}) => {
  const menuButton = navigation.getParam('menuButton');

  return {
    headerTitle: 'Списки покупок',
    headerRight: () => {
      return menuButton;
    },
  };
};

// Main.navigationOptions = ({navigation}) => ({
//   headerTitle: 'Списки покупок',
// });

export default Main;
