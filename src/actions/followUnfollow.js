import axios from 'axios';
import axiosHeader from '../axios_config';
import { getProfile } from './profile';
import { FOLLOW_USER, UNFOLLOW_USER } from './action_types';

export const followUser = userId => async (dispatch) => {
  await axios
    .post(
      `${
        process.env.REACT_APP_BASE_URL
      }/profile/view_profile/${userId}/follow/`,
      {},
      axiosHeader,
    )
    .then(() => {
      dispatch({
        type: FOLLOW_USER,
        payload: true,
      });
      dispatch(getProfile());
    })
    .catch(() => {
      dispatch({
        type: FOLLOW_USER,
        payload: true,
      });
      alert('Server Error'); // eslint-disable-line no-alert
    });
};

export const unfollowUser = userId => async (dispatch) => {
  await axios
    .delete(
      `${
        process.env.REACT_APP_BASE_URL
      }/profile/view_profile/${userId}/follow/`,
      axiosHeader,
    )
    .then(() => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: true,
      });
      dispatch(getProfile());
    })
    .catch(() => {
      dispatch({
        type: UNFOLLOW_USER,
        payload: true,
      });
      alert('Server Error'); // eslint-disable-line no-alert
    });
};
