import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import combineReducers from '../reducers/index';

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
store = createStore(rootReducer, storeEnhancer(applyMiddleware(thunk)));
const store = createStore(combineReducers, storeEnhancer(applyMiddleware(thunk)));
export default store;
