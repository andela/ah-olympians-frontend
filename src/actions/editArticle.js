import axios from 'axios';
import { UPDATE_ARTICLE, ACTION_FAILED } from './types';
import axiosHeader from '../axios_config';

const apiURL2 = 'https://aholympian.herokuapp.com/api/articles/';

export const editArticle = (slug, postData) => async (dispatch) => {
  await axios
    .put(`${apiURL2}${slug}`, postData, axiosHeader)
    .then((result) => {
      dispatch({ type: UPDATE_ARTICLE, payload: result.data });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_FAILED,
        payload: error,
      });
    });
};
