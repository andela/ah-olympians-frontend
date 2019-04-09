import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import PostArticle from '../components/Articles/PostArticle';
import GetArticle from '../components/Articles/ViewArticle';
import EditArticle from '../components/Articles/UpdateArticle';
import { Provider } from 'react-redux';
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
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/resetpassword" component={RequestResetForm} />
          <Route path="/resetform/:token" component={ResetPassword} />
          <Route path="/followers" component={Followers} />
          <Route path="/following" component={Following} />
          <Route path="/profiles" component={ViewProfiles} />
          <Route path="/articles/new" component={PostArticle} />
          <Route path="/article/:slug" component={GetArticle} exact />
          <Route path="/article/:slug/edit" component={EditArticle} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Approuter;

