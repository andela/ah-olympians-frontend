import axios from 'axios';
import axiosHeader from '../axios_config';
import { FETCH_FOLLOWERS, FETCH_FOLLOWING } from './action_types';


export const fetchFollowing = () => async (dispatch) => {
  await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/profile/view_profile/following/`,
      axiosHeader,
    )
    .then((result) => {
      dispatch({
        type: FETCH_FOLLOWING,
        payload: result.data.profile.following_count,
      });
    })
    .catch(() => {
      alert('Server Error'); // eslint-disable-line no-alert
    });
};

export const fetchFollowers = () => async (dispatch) => {
  await axios
    .get(
      `${process.env.REACT_APP_BASE_URL}/profile/view_profile/followers/`,
      axiosHeader,
    )
    .then((result) => {
      let returnData;
      if (result.data.profile) {
        returnData = result.data.profile;
      } else {
        returnData = { followers: { }, followers_count: 0 };
      }
      dispatch({
        type: FETCH_FOLLOWERS,
        payload: returnData,
      });
    })
    .catch(() => {
      alert('Server Error'); // eslint-disable-line no-alert
    });
};
