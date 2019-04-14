import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import registerReducer from './register';
import userReducer from './user';
import articleReducer from './article';

const rootReducer = combineReducers({
  registerUser: registerReducer, user: userReducer, article: articleReducer, login: loginReducer,
});

export default rootReducer;
