import React, {useEffect} from 'react';
import MainView from './views/MainView';
import {mainViewStyles} from './styles/mainViewStyles';
import {useMainScreenModel} from './models/mainViewModel_V2';
import {useMainScreenController} from './controllers/mainViewController_V2';
import MenuButton from '../../components/main-screen/MenuButton';

const Main = () => {
  const styles = mainViewStyles;
  const model = useMainScreenModel();
  const controller = useMainScreenController(model);

  const menuButton = <MenuButton onPress={controller.menuButtonHandler} />;

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

export default Main;
