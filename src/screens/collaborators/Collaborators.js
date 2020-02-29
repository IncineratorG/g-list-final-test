import React from 'react';
import CollaboratorsView from './views/CollaboratorsView';
import {collaboratorsViewStyles} from './styles/collaboratorsViewStyles';
import {useCollaboratorsScreenModel} from './models/collaboratorsViewModel';
import {useCollaboratorsScreenController} from './controllers/collaboratorsViewController';

const Collaborators = () => {
  const styles = collaboratorsViewStyles;
  const model = useCollaboratorsScreenModel();
  const controller = useCollaboratorsScreenController(model);

  return (
    <CollaboratorsView
      styles={styles}
      model={model.data}
      controller={controller}
    />
  );
};

export default Collaborators;
