import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/signup/register';
import Home from '../components/Home/Home';
import Profile from '../components/profile/Profile';
import RequestResetForm from '../components/ResetPassword/requestReset';
import ResetPassword from '../components/ResetPassword/resetPassword';
import store from '../store/index';


const Approuter = () => (
  <Provider store={store}>
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/resetpassword" component={RequestResetForm} />
          <Route path="/resetform/:token" component={ResetPassword} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
);
  export default Approuter;

