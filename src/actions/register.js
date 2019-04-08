import axios from 'axios';
import axiosHeader from '../axios_config';
import * as actionTypes from './action_types';

export const submitStatus = submitState => dispatch => dispatch({
  type: actionTypes.REGISTER_SUMBITTABLE, payload: submitState,
});

export const registerSuccess = () => dispatch => dispatch({
  type: actionTypes.REGISTER_SUCCESS, payload: true,
});

export const registerUser = userdata => async (dispatch) => {
  const postData = JSON.stringify({ user: userdata });
  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/users/`, postData, axiosHeader)
    .then((result) => {
      dispatch({ type: actionTypes.REGISTER_USER, payload: result.data.user });
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      return dispatch(registerSuccess());
    })
    .catch((error) => {
      const retData = error.response.data.errors;
      if (retData) {
        if (!('username' in retData)) {
          retData.username = [];
        }

        if (!('email' in retData)) {
          retData.email = [];
        }

        if (!('password' in retData)) {
          retData.password = [];
        }

        dispatch(submitStatus(true));
        return dispatch({ type: actionTypes.REGISTER_ERROR, payload: retData });
      }

      dispatch(submitStatus(true));
      return alert('Server Error'); // eslint-disable-line no-alert
    });
};
