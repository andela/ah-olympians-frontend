import axios from 'axios';
import axiosHeader from '../axios_config';
import { EMAIL_SEND, FAIL_SEND } from './types';

const apiURL = 'https://aholympian.herokuapp.com/api/';
export const success = message => ({ type: EMAIL_SEND, payload: message });
export const failure = errors => ({ type: FAIL_SEND, payload: errors });

const requestPassword = data => (dispatch) => {
  axios.post(`${apiURL}users/reset_password/`, {
     email: data.emailData },
    axiosHeader
  ) 
    .then((res) => {
      console.log(res)
      if (res.data) {
        dispatch(success(res.data.message));
      }
    })
    .catch((err) => {
      if (err.request.response) {
        if (JSON.parse(err.request.response).errors) {
          dispatch(failure(JSON.parse(err.request.response).errors.email[0]));
        } else {
          dispatch(failure(JSON.parse(err.request.response).detail));
        }
      }
    
    })
  }
export default requestPassword;
