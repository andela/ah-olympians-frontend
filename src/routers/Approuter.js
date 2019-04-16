import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/signup/register';
import Home from '../components/Home/Home';
import Profile from '../components/profile/Profile';

const Approuter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Approuter;
