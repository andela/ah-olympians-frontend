import {
  FETCH_ARTICLES, FETCH_ARTICLE, NEW_ARTICLE, UPDATE_ARTICLE, AUTHENTICATION_FAILED,
  ACTION_FAILED, REPORT_ARTICLE,
} from '../actions/types';

const initialState = {
  items: [],
  item: { article: {} },
  update_item: {},
  errors: [],
  errorsFound: false,
  successMessage: {},
  wasSuccessful: false,
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
        errorsFound: true,
      };
    case REPORT_ARTICLE:
      return {
        ...state,
        successMessage: action.payload,
        wasSuccessful: true,
        errorsFound: false,
      }
    default:
      return state;
  }
}
