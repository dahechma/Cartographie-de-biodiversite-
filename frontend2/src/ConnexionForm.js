import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import './connexion.css';
import { Link, redirect } from 'react-router-dom';

const ConnexionForm = () => {
  const [donnees, setDonnees] = useState({
    email: '',
    password: '',
  });

  const envoyerDonnees = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://127.0.0.1:8000/login-agriculteur/';
      const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };
  
      const reponse = await axios.post(url, donnees, { headers, withCredentials: true });
      console.log(reponse.data);
  
      // Assuming you have a function to handle redirection, use it here
      redirectUserToAjoutExploitation();
    } catch (erreur) {
      if (erreur.response) {
        // La requête a été faite, mais le serveur a répondu avec un code d'état différent de 2xx
        console.error('Erreur de réponse du serveur:', erreur.response.data);
        console.error('Statut de la réponse du serveur:', erreur.response.status);
      } else if (erreur.request) {
        // La requête a été faite, mais aucune réponse n'a été reçue
        console.error('Erreur lors de l\'attente d\'une réponse du serveur :', erreur.request);
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.error('Erreur lors de la configuration de la requête :', erreur.message);
      }
    }
  };
  
  // Example redirect function
  const redirectUserToAjoutExploitation = () => {
    // Replace this line with the actual redirection logic
    window.location.href = '/ajout-exploitation';
  };
  const handleChange = (e) => {
    setDonnees({ ...donnees, [e.target.name]: e.target.value });
  };

  return (
    <div className="conteneur">
      <div className="text-center">
        <img
          src="https://www.certifiedbeefriendly.org/wp-content/uploads/2022/01/cropped-BEEFRIENDLY_logoHD_RVB_020318.png"
          alt="Logo BF"
          height="auto"
          className="header_left"
          width="100"
          style={{ paddingLeft: '15px' }}
        />
        <h1 className="mt-3 bg-blue">Connexion</h1>
        <form onSubmit={envoyerDonnees} className="text-center">
          <input type="hidden" name="csrfmiddlewaretoken" value="7rEyBLsUi72XxJYePKGfcuCB4tHMgHOOifbrFg9EPwrQRSsMn847MrxgLRGe8wDn" />
  
          <div className="form-group">
            <label htmlFor="id_email">Email</label>
            <input type="email" name="email" maxLength="254" required id="id_email" className="form-control" placeholder="jean.dupont@none.com" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="id_mot_de_passe">Mot de passe</label>
            <input type="password" name="password" maxLength="30" required id="id_mot_de_passe" className="form-control" placeholder="Mot de passe" onChange={handleChange} />
          </div>
  
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
          <Link to="/inscription" className="btn btn-secondary">
          S'inscrire
        </Link>
        </form>
      </div>
    </div>
  );
  
  
};

export default ConnexionForm;
