import axios from 'axios';
import axiosHeader from '../axios_config';
import { FETCH_ARTICLES, ACTION_FAILED } from './types';

const apiURL = 'https://aholympian.herokuapp.com/api/';

export const getArticles = () => async (dispatch) => {
  await axios
    .get(`${apiURL}articles`, axiosHeader)
    .then((result) => {
      dispatch({ type: FETCH_ARTICLES, payload: result.data });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_FAILED,
        payload: error,
      });
    });
};
