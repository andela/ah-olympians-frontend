import { LOCAL_STORAGE } from './action_types';

export const userDefault = {
  username: '',
  email: '',
  token: '',
};

export const fetchLocalStorage = () => (dispatch) => {
  let userDetails = { user: userDefault };
  if (localStorage.getItem('user')) {
    userDetails = JSON.parse(localStorage.getItem('user'));
  }

  dispatch({
    type: LOCAL_STORAGE, payload: userDetails.user,
  });
};
