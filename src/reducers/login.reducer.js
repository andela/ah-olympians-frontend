import { loginConstants } from '../constants';

const initialState = {
  loggedIn: false,
  user: {},
};

function loginReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
export default loginReducer;
