import React from 'react';
import RegistrationScreen from './screens/RegistrationScreen';
import {registrationScreenStyles} from './styles/RegistrationScreenStyles';
import {useRegistrationScreenModel} from './models/RegistrationScreenModel';
import {useRegistrationScreenController} from './controllers/RegistrationScreenController';

const Registration = () => {
  const styles = registrationScreenStyles;
  const model = useRegistrationScreenModel();
  const controller = useRegistrationScreenController(model);

  return (
    <RegistrationScreen
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

Registration.navigationOptions = ({navigation}) => ({
  headerTitle: 'Регистрация',
});

export default Registration;
