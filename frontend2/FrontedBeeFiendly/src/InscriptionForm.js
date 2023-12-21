// InscriptionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InscriptionForm = () => {
  const [donnees, setDonnees] = useState({
    name_structure: '',
    types: 'individual',
    name: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
  });

  const envoyerDonnees = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://127.0.0.1:8000/';
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
    <div className="container mt-5">
      <div className="text-center">
        <img
          src="https://www.certifiedbeefriendly.org/wp-content/uploads/2022/01/cropped-BEEFRIENDLY_logoHD_RVB_020318.png"
          alt="Logo BF"
          height="auto"
          className="header_left"
          width="100"
          style={{ paddingLeft: '15px' }}
        />
        <h1 className="mt-3 bg-blue">Inscription</h1>
        <form onSubmit={envoyerDonnees} className="text-center">
          <input type="hidden" name="csrfmiddlewaretoken" value="7rEyBLsUi72XxJYePKGfcuCB4tHMgHOOifbrFg9EPwrQRSsMn847MrxgLRGe8wDn" />

          <div className="form-group">
            <label htmlFor="id_name_structure">Nom de la structure agricole</label>
            <input
              type="text"
              name="name_structure"
              maxLength="100"
              required
              id="id_name_structure"
              className="form-control"
              placeholder="Les Vergers du Soleil"
              value={donnees.name_structure}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="typeEx">Type d'exploitation</label>
            <select
              id="typeEx"
              name="types"
              className="form-control"
              value={donnees.types}
              onChange={handleChange}
            >
            <option className='text-blue' value="individual">Exploitation individuelle</option>
              <option value="collective">Exploitation collective</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="id_name">Nom</label>
            <input
              type="text"
              name="name"
              maxLength="30"
              required
              id="id_name"
              className="form-control"
              placeholder="Dupont"
              value={donnees.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="id_firstname">Prenom</label>
            <input type="text" name="firstname" maxLength="30" required id="id_firstname" className="form-control" placeholder="Jean" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="id_username">Pseudo</label>
            <input type="text" name="username" maxLength="30" required id="id_username" className="form-control" placeholder="JDupont" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="id_email">Email</label>
            <input type="email" name="email" maxLength="254" required id="id_email" className="form-control" placeholder="jean.dupont@none.com" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="id_mot_de_passe">password</label>
            <input type="password" name="password" maxLength="30" required id="id_mot_de_passe" className="form-control" placeholder="Mot de passe" onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionForm;
