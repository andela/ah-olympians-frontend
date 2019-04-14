import axios from 'axios';
import axiosHeader from '../axios_config';
import { EDITPROFILE, GETARTICLE, GETPROFILE } from '../constants/action-types';

const apiURL = 'https://aholympian.herokuapp.com/api/';

export const editProfile = postData => async (dispatch) => {
  await axios
    .put(`${apiURL}profile/edit_profile/`, postData, axiosHeader)
    .then((result) => {
      dispatch({ type: EDITPROFILE, payload: result.data });
    })
    .catch((error) => {
    });
};

export const getProfile = () => async (dispatch) => {
  await axios
    .get(`${apiURL}profile/view_profiles`, axiosHeader)
    .then((result) => {
      dispatch({ type: GETPROFILE, payload: result.data });
    })
    .catch((error) => {
    });
};

export const getArticle = () => async (dispatch) => {
  await axios
    .get(`${apiURL}articles`, axiosHeader)
    .then((result) => {
      dispatch({ type: GETARTICLE, payload: result.data });
    })
    .catch((error) => {
    });
};
