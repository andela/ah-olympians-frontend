import * as actionTypes from '../actions/action_types';

const initialState = {
  following: 0,
  followers: {},
  follow: false,
  unfollow: false,
};

const followingReducer = (state = initialState, action) => {
  if (action !== undefined) {
    switch (action.type) {
      case actionTypes.FETCH_FOLLOWING:
        return { ...state, following: action.payload };
      case actionTypes.FETCH_FOLLOWERS:
        return { ...state, followers: action.payload };
      default:
        return state;
    }
  }

  return state;
};

export default followingReducer;
