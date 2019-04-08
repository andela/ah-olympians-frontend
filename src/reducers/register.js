import * as actionTypes from '../actions/action_types';

const initialState = {
  user: {},
  errors: {
    username: [],
    email: [],
    password: [],
  },
  submittable: true,
  successful: false,
};

const registerReducer = (state = initialState, action) => {
  if (action !== undefined) {
    switch (action.type) {
      case actionTypes.REGISTER_USER:
        return { ...state, user: action.payload };
      case actionTypes.REGISTER_SUCCESS:
        return { ...state, successful: action.payload };
      case actionTypes.REGISTER_ERROR:
        return { ...state, errors: action.payload };
      case actionTypes.REGISTER_SUMBITTABLE:
        return { ...state, submittable: action.payload };
      default:
        return state;
    }
  }

  return state;
};

export default registerReducer;
