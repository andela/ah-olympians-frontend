import {
  FETCH_COMMENTS,
  COMMENT_ON_ARTICLE,
  COMMENT_ON_COMMENT,
  EDIT_COMMENT,
} from '../actions/action_types';

const initialState = {
  comments: {
    comments: [],
    commentsCount: 0,
  },
  addedComment: {},
};

const commentsReducer = (state = initialState, action) => {
  if (action !== undefined) {
    switch (action.type) {
      case FETCH_COMMENTS:
        return { ...state, comments: action.payload };
      case (COMMENT_ON_ARTICLE || COMMENT_ON_COMMENT || EDIT_COMMENT):
        return { ...state, addedComment: action.payload };
      default:
        return state;
    }
  }

  return state;
};

export default commentsReducer;
