import React from 'react';
import AuthenticationView from './views/AuthenticationView';
import {authenticationViewStyles} from './styles/authenticationViewStyles';
import {useRegistrationScreenModel} from './models/authenticationViewModel';
import {useRegistrationScreenController} from './controllers/authenticationViewController';

const Authentication = () => {
  const styles = authenticationViewStyles;
  const model = useRegistrationScreenModel();
  const controller = useRegistrationScreenController(model);

  return (
    <AuthenticationView
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

Authentication.navigationOptions = ({navigation}) => ({
  headerTitle: 'Регистрация',
});

export default Authentication;
