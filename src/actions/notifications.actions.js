import axios from 'axios';
import axiosHeader from '../axios_config';
import { notificationConstants } from '../constants';

export const getNotifications = () => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/profile/view_profile/notifications/`, axiosHeader)
    .then((result) => {
      dispatch({
        type: notificationConstants.NOTIFY_SUCCESS,
        payload: result.data,
      });
    })
    .catch(() => {});
};

export default getNotifications;
