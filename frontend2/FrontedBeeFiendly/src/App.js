import React from 'react';
import InscriptionForm from './InscriptionForm';
import AjoutExploitationForm from './AjoutExploitationForm';
import ConnexionForm from './ConnexionForm';
const App = () => {
  return (
    <div>
      <InscriptionForm />
      <AjoutExploitationForm />
      <ConnexionForm />

      {/* Ajoutez d'autres composants ou du contenu ici */}
    </div>
  );
};

export default App;