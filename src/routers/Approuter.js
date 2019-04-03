import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from '../components/profile/Profile';

const Approuter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Approuter;
