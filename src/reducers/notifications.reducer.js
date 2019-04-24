import { notificationConstants } from '../constants';

const initialState = {
  notifications: {},
};

const notificationReducer = (state = initialState, action) => {
  if (action.type === notificationConstants.NOTIFY_SUCCESS) {
    return {
      ...state,
      notifications: action.payload,
    };
  }
  return state;
};

export default notificationReducer;
