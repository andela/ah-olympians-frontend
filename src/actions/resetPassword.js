import axios from 'axios';
import axiosHeader from '../axios_config'
import { RESET_SUCCESSFUL, RESET_FAILURE, RESET_REQUEST } from './types';

const apiURL = 'https://aholympian.herokuapp.com/api/';
export const resetPasswordAction = () => ({ type: RESET_REQUEST });
export const success = message => ({
  type: RESET_SUCCESSFUL,
  payload: message,
});
export const failure = error => ({ type: RESET_FAILURE, payload: error });

export const resetPassword = data => async (dispatch) => {
  const urlArray = window.location.href.split('/');
  const token = urlArray[urlArray.length - 1];
  dispatch(resetPasswordAction());

  
  await axios.put(`${apiURL}users/reset_password/${token}`, {
    password: data.password },
    axiosHeader
  )
    .then((res) => {
      dispatch(success(res.data.message));
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    })
    .catch((err) => {
      dispatch(failure('Error while making the request'));
    });
};
export default resetPassword;
