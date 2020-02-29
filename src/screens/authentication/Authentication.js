import React from 'react';
import AuthenticationView from './views/AuthenticationView';
import {authenticationViewStyles} from './styles/authenticationViewStyles';
import {useAuthenticationScreenModel} from './models/authenticationViewModel';
import {useRegistrationScreenController} from './controllers/authenticationViewController';

const Authentication = () => {
  const styles = authenticationViewStyles;
  const model = useAuthenticationScreenModel();
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
