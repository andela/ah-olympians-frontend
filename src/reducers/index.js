import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import registerReducer from './register';
import userReducer from './user';
import articleReducer from './article';
import articlesReducer from './articlesReducer';
import { requestPassword } from './requestPasswordReset';
import { resetPassword } from './resetPassword';
import followingReduce from './following';

const rootReducer = combineReducers({
  registerUser: registerReducer,
  user: userReducer,
  articles: articlesReducer,
  login: loginReducer,
  following: followingReduce,
  requestPassword,
  resetPassword,
});

export default rootReducer;
