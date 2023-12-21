// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to adjust the path based on your project structure
import DeconnexionBouton from './deconnexion';

function Navbar() {
  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <img
          src="https://www.certifiedbeefriendly.org/wp-content/uploads/2022/01/cropped-BEEFRIENDLY_logoHD_RVB_020318.png"
          alt="Logo BF"
          className="header-left"
        />
      </div>
      <div className="navbar-buttons">
        <Link to="/Page1">
          <button>Mes exploitations</button>
        </Link>
        <Link to="/mabio">
          <button>Ma biodiversité</button>
        </Link>
        <Link to="/aide">
          <button>Aide</button>
        </Link>
        <DeconnexionBouton />

      </div>
      <div className="navbar-icons">
        <button className="arrow">&#8595;</button>
        <button className="profile">&#128100;</button>
      </div>
    </header>
  );
}

export default Navbar;
