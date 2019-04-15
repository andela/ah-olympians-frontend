import { combineReducers } from 'redux';
import registerReducer from './register';

const rootReducer = combineReducers({ registerUser: registerReducer });

export default rootReducer;
