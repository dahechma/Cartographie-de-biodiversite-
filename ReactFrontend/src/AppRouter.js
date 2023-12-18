// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InscriptionForm from './InscriptionForm';
import AjoutExploitationForm from './AjoutExploitationForm';
import ConnexionForm from './ConnexionForm';
import AjoutParcelle from './AjoutParcelle';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ConnexionForm} />
        <Route path="/inscription" component={InscriptionForm} />
        <Route path="/connexion" component={ConnexionForm} />
        <Route path="/AjoutParcelle" component={AjoutParcelle} />
        <Route path="/AjoutExploitation" component={AjoutExploitationForm} />


      </Switch>
    </Router>
  );
};

export default AppRouter;
