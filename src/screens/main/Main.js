import React from 'react';
import MainView from './views/MainView';
import {mainViewStyles} from './styles/mainViewStyles';
import {useMainScreenModel} from './models/mainViewModel';
import {useMainScreenController} from './controllers/mainViewController';

const Main = () => {
  const styles = mainViewStyles;
  const model = useMainScreenModel();
  const controller = useMainScreenController(model);

  return (
    <MainView styles={styles} model={model.data} controller={controller} />
  );
};

Main.navigationOptions = ({navigation}) => ({
  headerTitle: 'Списки покупок',
});

export default Main;
