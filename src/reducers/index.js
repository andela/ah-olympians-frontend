import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import registerReducer from './register';

const rootReducer = combineReducers({ registerUser: registerReducer, login: loginReducer });

export default rootReducer;
