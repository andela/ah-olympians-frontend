import { GETARTICLE } from '../constants/action-types';

const initialState = {
  article: [],
};

function articleReducer(state = initialState, action) {
  if (action.type === GETARTICLE) {
    return {
      ...state,
      article: action.payload,
    };
  }
  return state;
}

export default articleReducer;
