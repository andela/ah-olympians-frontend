import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './components/profile/styles/Profile.css';
import './css/bootstrap.min.css';
import './index.css';
import Approuter from './routers/Approuter';
import * as serviceWorker from './serviceWorker';
import store from './store/index';

require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <Approuter />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
