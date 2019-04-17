import { EMAIL_SEND, FAIL_SEND } from '../actions/types';

/* This are the action types that are going to take place when an email is sent
 */
export const initialState = {
  message: {},
  errors: {},
};
export function requestPassword(state = initialState, action) {
  switch (action.type) {
    case EMAIL_SEND:
      return { ...state, message: action.payload, errors: null };
    case FAIL_SEND:
      return { ...state, errors: action.payload, message: '' };
    default:
      return state;
  }
}
