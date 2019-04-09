import { LIKE_REQUEST, LIKE_SUCCESSFUL, LIKE_FAILURE } from '../actions/types';

export const initialState = {
  like: false,
  dislike: false,
};
export function sendLike(state = {}, action) {
  switch (action.type) {
    case LIKE_REQUEST:
      return { ...state, sending_like: true };
    case LIKE_SUCCESSFUL:
      return {
        ...state,
        sending_like: false,
        data: action.payload.message,
        like: true,
      };
    case LIKE_FAILURE:
      return {
        ...state,
        sendLike: false,
        failed: true,
        error: action.payload,
      };
    default:
      return state;
  }
}
