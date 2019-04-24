import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import registerReducer from './register';
import userReducer from './user';
import articlesReducer from './articlesReducer';
import { requestPassword } from './requestPasswordReset';
import { resetPassword } from './resetPassword';
import followingReduce from './following';
import { sendLike } from './like.article.reducer';
import notificationReducer from './notifications.reducer';

const rootReducer = combineReducers({
  registerUser: registerReducer,
  user: userReducer,
  articles: articlesReducer,
  login: loginReducer,
  following: followingReduce,
  notifications: notificationReducer,
  requestPassword,
  resetPassword,
  sendLike,
});

export default rootReducer;
