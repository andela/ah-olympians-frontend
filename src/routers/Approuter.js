import React, { Component } from 'react';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Approuter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Approuter;
