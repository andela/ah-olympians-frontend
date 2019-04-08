import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/Home/Home';
import Register from '../components/signup/register';

const Approuter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Approuter;
