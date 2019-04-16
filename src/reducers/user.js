import { EDITPROFILE, GETPROFILE } from '../constants/action-types';

const initialState = {
  user_data: {},
};

function userReducer(state = initialState, action) {
  /**
   * takes state and action
   */
  if (action.type === EDITPROFILE) {
    return {
      ...state,
      user_data: action.payload
    };
  }
  if (action.type === GETPROFILE) {
    return {
      ...state,
      user_data: action.payload,
    };
  }
  return state;
}

export default userReducer;
