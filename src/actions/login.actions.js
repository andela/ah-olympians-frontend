import axios from 'axios';
import { loginConstants } from '../constants/index';

function success(user) {
  return {
    type: loginConstants.LOGIN_SUCCESS,
    payload: user,
  };
}

function failure(error) {
  return {
    type: loginConstants.LOGIN_FAILURE,
    error,
  };
}

const loginAction = (email, password) => async (dispatch) => {
  const userData = { email, password };
  const params = { user: userData };
  await axios
    .post('https://aholympian.herokuapp.com/api/users/login/', params, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.data)
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(success(user));

      // return user;
    })
    .catch((error) => {
      const err = error.response.data.errors.error[0];
      dispatch(failure(err));
    });
};

export default loginAction;
