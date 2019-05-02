import {
  FETCH_ARTICLES, FETCH_ARTICLE, NEW_ARTICLE, UPDATE_ARTICLE, AUTHENTICATION_FAILED, ACTION_FAILED,
} from '../actions/types';

const initialState = {
  items: [],
  item: {},
  update_item: {},
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        errors: action.payload,
        authenticated: false,
      };
    case FETCH_ARTICLES:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_ARTICLE:
      return {
        ...state,
        item: action.payload,
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        update_item: action.payload,
      };
    case ACTION_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
}
