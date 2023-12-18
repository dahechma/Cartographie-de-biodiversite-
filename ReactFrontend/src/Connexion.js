// ConnexionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import './connexion.css';

const ConnexionForm = () => {
  const [donnees, setDonnees] = useState({
    email: '',
    password: '', // Garder le nom du champ comme "password"
  });

  const envoyerDonnees = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://127.0.0.1:8000/login-agriculteur/';
      const reponse = await axios.post(url, donnees);
      console.log(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors de l\'envoi des données :', erreur);
    }
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
            <label htmlFor="id_mot_de_passe">password</label>
            <input type="password" name="password" maxLength="30" required id="id_mot_de_passe" className="form-control" placeholder="password" onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">
            Se conecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConnexionForm;