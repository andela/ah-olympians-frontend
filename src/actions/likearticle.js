import axios from 'axios';
import axiosHeader from '../axios_config';
import { LIKE_SUCCESSFUL, LIKE_FAILURE } from './types';
import { fetchArticle } from '../actions/postArticles';

const apiURL = 'https://aholympian.herokuapp.com/api';
export const success = message => ({ type: LIKE_SUCCESSFUL, payload: message });
export const failure = errors => ({ type: LIKE_FAILURE, payload: errors });

const likeArticle = data => dispatch => {
  const { action, slug } = data;
  axios
    .post(`${apiURL}/articles/${slug}/${action}`, {}, axiosHeader)
    .then(response => {
      dispatch(success(response.data));
      dispatch(fetchArticle(slug));
    })
    .catch(error => {
      dispatch(failure(JSON.stringify(error.response.data)));
    });
};

export default likeArticle;
