import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose } from 'redux/es/redux';
import allReducers from '../reducers/index';

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, storeEnhancer(applyMiddleware(thunk)));

export default store;
