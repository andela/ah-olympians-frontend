import axios from 'axios';
import { FETCH_ARTICLES, ACTION_FAILED } from './types';

const apiURL = 'https://aholympian.herokuapp.com/api/';

const getArticles = () => async (dispatch) => {
  await axios
    .get(`${apiURL}articles`, { headers: { 'Content-Type': 'application/json' } })
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

export default getArticles;
