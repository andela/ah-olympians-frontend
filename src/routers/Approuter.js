import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/signup/register';
import Profile from '../components/profile/Profile';
import RequestResetForm from '../components/ResetPassword/requestReset';
import ResetPassword from '../components/ResetPassword/resetPassword';
import store from '../store/store';
import ViewProfiles from '../components/Following/viewprofiles';
import Followers from '../components/Following/followers';
import Following from '../components/Following/following';

const Approuter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={App} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/resetpassword" component={RequestResetForm} />
          <Route path="/resetform/:token" component={ResetPassword} />
          <Route path="/profile" component={Profile} />
          <Route path="/followers" component={Followers} />
          <Route path="/following" component={Following} />
          <Route path="/profiles" component={ViewProfiles} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);
export default Approuter;
