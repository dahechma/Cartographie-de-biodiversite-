// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'; // Assurez-vous d'importer ces éléments
import App from './App';
import InscriptionForm from './InscriptionForm'; // Importer le composant InscriptionForm
import AjoutExploitationForm from './AjoutExploitationForm'; // Importer le composant AjoutExploitationForm
import ConnexionForm from './ConnexionForm'; // Importer le composant ConnexionForm
import reportWebVitals from './reportWebVitals';
import AjoutParcelle from './AjoutParcelle';

// Créer une instance de BrowserRouter
const router = createBrowserRouter([
  {
    path: '/inscription',
    element: <InscriptionForm />,
  },
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/ajout-exploitation',
    element: <AjoutExploitationForm />,
  },
 
  {
    path: '/connexion',
    element: <ConnexionForm />,
  },
  {
    path: '/AjouterParcelle',
    element: <AjoutParcelle />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}> {/* Utiliser RouterProvider pour fournir le router à l'ensemble de l'application */}
      <App />
    </RouterProvider>
  </React.StrictMode>,
);

reportWebVitals();
