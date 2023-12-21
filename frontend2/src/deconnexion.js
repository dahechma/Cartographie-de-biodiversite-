import React from 'react';
import axios from 'axios';

const DeconnexionBouton = () => {
  const handleDeconnexion = async () => {
    try {
      const url = 'http://127.0.0.1:8000/deconnexion/';
      await axios.post(url);

      // Utilisez la méthode de navigation du navigateur pour rediriger l'utilisateur
      window.location.href = '/connexion';
    } catch (erreur) {
      console.error('Erreur lors de la déconnexion :', erreur);
    }
  };

  return (
    <button onClick={handleDeconnexion}>
      Déconnexion
    </button>
  );
};

export default DeconnexionBouton;
