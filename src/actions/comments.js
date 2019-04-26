import axios from 'axios';
import axiosHeader from '../axios_config';
import {
  FETCH_COMMENTS, COMMENT_ON_ARTICLE, COMMENT_ON_COMMENT, EDIT_COMMENT,
} from './action_types';

export const fetchArticleComments = slug => async (dispatch) => {
  await axios
    .get(
      `${
        process.env.REACT_APP_BASE_URL
      }/articles/${slug}/comments/`,
      axiosHeader,
    )
    .then((result) => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: result.data,
      });
    })
    .catch(() => {});
};

export const CommentOnArticle = (slug, comment) => async (dispatch) => {
  await axios
    .post(
      `${
        process.env.REACT_APP_BASE_URL
      }/articles/${slug}/comments/`,
      { comment },
      axiosHeader,
    )
    .then((result) => {
      dispatch({
        type: COMMENT_ON_ARTICLE,
        payload: result.data,
      });
      dispatch(fetchArticleComments(slug));
    })
    .catch(() => {
      alert('Server Error'); // eslint-disable-line no-alert
    });
};

export const CommentOnComment = (slug, commentId, comment) => async (dispatch) => {
  await axios
    .post(
      `${
        process.env.REACT_APP_BASE_URL
      }/articles/${slug}/comments/${commentId}/subcomment`,
      { comment },
      axiosHeader,
    )
    .then((result) => {
      dispatch({
        type: COMMENT_ON_COMMENT,
        payload: result.data,
      });
      dispatch(fetchArticleComments(slug));
    })
    .catch(() => {
      alert('Server Error'); // eslint-disable-line no-alert
    });
};

export const editComment = (slug, commentId, comment) => async (dispatch) => {
  await axios
    .put(
      `${
        process.env.REACT_APP_BASE_URL
      }/articles/${slug}/comments/${commentId}`,
      { comment },
      axiosHeader,
    )
    .then((result) => {
      dispatch({
        type: EDIT_COMMENT,
        payload: result.data,
      });
      dispatch(fetchArticleComments(slug));
    })
    .catch(() => {
      alert('Server Error'); // eslint-disable-line no-alert
    });
};
