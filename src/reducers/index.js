import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import registerReducer from './register';
import userReducer from './user';
import articleReducer from './article';
import { requestPassword } from './requestPasswordReset';
import { resetPassword } from './resetPassword';

const rootReducer = combineReducers({
  registerUser: registerReducer,
  user: userReducer,
  article: articleReducer,
  login: loginReducer,
  requestPassword,
  resetPassword,
});

export default rootReducer;
