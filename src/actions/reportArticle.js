import axios from 'axios';
import { REPORT_ARTICLE, ACTION_FAILED } from './types';
import axiosHeader from '../axios_config';

const apiURL2 = 'https://aholympian.herokuapp.com/api/';

export const reportArticle = (slug, postData) => async (dispatch) => {
  await axios
    .post(`${apiURL2}report/${slug}/`, postData, axiosHeader)
    .then((result) => {
      dispatch({
        type: REPORT_ARTICLE,
        payload: result.data,
      });
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      dispatch({
        type: ACTION_FAILED,
        payload: error.response.data,
      });
    });
};
