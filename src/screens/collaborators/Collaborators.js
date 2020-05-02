import React from 'react';
import CollaboratorsView_V2 from './views/CollaboratorsView_V2';
import {useCollaboratorsScreenModel} from './models/collaboratorsViewModel';
import {useCollaboratorsScreenController} from './controllers/collaboratorsViewController';
import {collaboratorsViewStyles_V2} from './styles/collaboratorsViewStyles_V2';

const Collaborators = () => {
  const styles = collaboratorsViewStyles_V2;
  const model = useCollaboratorsScreenModel();
  const controller = useCollaboratorsScreenController(model);

  return (
    <CollaboratorsView_V2
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

Collaborators.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Контакты',
  };
};

export default Collaborators;
