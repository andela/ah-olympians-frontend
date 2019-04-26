import { loginConstants } from '../constants';
import {
  SOCIAL_LOGIN_ERROR,
  SOCIAL_LOGIN_SUCCESS,
  LOCAL_STORAGE,
} from '../actions/action_types';

const initialState = {
  loggedIn: false,
  user: {},
};

function loginReducer(state = initialState, action) {
  let status = true;

  switch (action.type) {
    case loginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        errors: '',
      };
    case loginConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        errors: action.error,
        user: {},
      };
    case LOCAL_STORAGE:
      if (!action.payload.username) {
        status = false;
      }
      return {
        ...state,
        loggedIn: status,
        user: action.payload,
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        errors: '',
      };
    case SOCIAL_LOGIN_ERROR:
      return { loggedIn: false, errors: action.payload, user: {} };
    default:
      return state;
  }
}
export default loginReducer;
