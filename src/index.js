import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import './css/bootstrap.min.css';
import './css/main.scss';
import './components/profile/styles/Profile.css';
import Approuter from './routers/Approuter';
import store from './store/store';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <Approuter />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

