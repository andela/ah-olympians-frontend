import {
  RESET_REQUEST,
  RESET_SUCCESSFUL,
  RESET_FAILURE,
} from '../actions/types';
/* This are the action types that are going to take place when the password is sent
for reset */

export const initialState = {};
export function resetPassword(state = {}, action) {
  switch (action.type) {
    case RESET_REQUEST:
      return { ...state };
    case RESET_SUCCESSFUL:
      return { ...state, message: action.payload };
    case RESET_FAILURE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
