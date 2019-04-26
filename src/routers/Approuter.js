import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import Page404 from '../components/ErrorPages/Page404';
import PostArticlePage from '../components/Articles/PostArticle';
import GetArticlePage from '../components/Articles/ViewArticle';
import EditArticlePage from '../components/Articles/UpdateArticle';
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
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/resetpassword" component={RequestResetForm} exact />
          <Route path="/resetform/:token" component={ResetPassword} exact />
          <Route path="/followers" component={Followers} exact />
          <Route path="/following" component={Following} exact />
          <Route path="/profiles" component={ViewProfiles} exact />
          <Route path="/articles/new" component={PostArticlePage} exact />
          <Route path="/article/:slug" component={GetArticlePage} exact />
          <Route path="/article/:slug/edit" component={EditArticlePage} exact />
          <Route component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Approuter;
