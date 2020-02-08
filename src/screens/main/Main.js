import React from 'react';
import MainScreen from './screens/MainScreen';
import {mainScreenStyles} from './styles/MainScreenStyles';
import {useMainScreenModel} from './models/MainScreenModel';
import {useMainScreenController} from './controllers/MainScreenController';

const Main = () => {
  const styles = mainScreenStyles;
  const model = useMainScreenModel();
  const controller = useMainScreenController(model);

  return (
    <MainScreen styles={styles} model={model.data} controller={controller} />
  );
};

Main.navigationOptions = ({navigation}) => ({
  headerTitle: 'Списки покупок',
});

export default Main;
