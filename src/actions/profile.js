import axios from 'axios';
import axiosHeader from '../axios_config';
import { fetchFollowing, fetchFollowers } from './following';
import { EDITPROFILE, GETARTICLE, GETPROFILE } from '../constants/action-types';

const apiURL = 'https://aholympian.herokuapp.com/api/';

export const editProfile = postData => async (dispatch) => {
  await axios
    .put(`${apiURL}profile/edit_profile/`, postData, axiosHeader)
    .then((result) => {
      dispatch({ type: EDITPROFILE, payload: result.data });
    })
    .catch(() => {
    });
};

export const getProfile = () => async (dispatch) => {
  await axios
    .get(`${apiURL}profile/view_profiles`, axiosHeader)
    .then((result) => {
      let returnData;
      if (result.data.profile) {
        returnData = result.data;
      } else {
        returnData = { profile: { profiles: {} } };
      }

      dispatch({ type: GETPROFILE, payload: returnData });
      dispatch(fetchFollowing());
      dispatch(fetchFollowers());
    })
    .catch(() => {
      dispatch({ type: GETPROFILE, payload: { profile: { profiles: {} } } });
    });
};

export const getArticle = () => async (dispatch) => {
  await axios
    .get(`${apiURL}articles`, axiosHeader)
    .then((result) => {
      dispatch({ type: GETARTICLE, payload: result.data });
    })
    .catch(() => {
    });
};
