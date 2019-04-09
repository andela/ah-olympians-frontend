import axios from 'axios';
import { FETCH_ARTICLE, NEW_ARTICLE, ACTION_FAILED } from './types';
import axiosHeader from '../axios_config';

const apiURL2 = 'https://aholympian.herokuapp.com/api/articles/';

export const createArticle = postData => async (dispatch) => {
  await axios
    .post(`${apiURL2}`, postData, axiosHeader)
    .then((result) => {
      dispatch({ type: NEW_ARTICLE, payload: result.data });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_FAILED,
        payload: error,
      });
    });
};

export const fetchArticle = slug => async (dispatch) => {
  await axios
    .get(`${apiURL2}${slug}`, axiosHeader)
    .then((result) => {
      dispatch({ type: FETCH_ARTICLE, payload: result.data });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_FAILED,
        payload: error,
      });
    });
};
