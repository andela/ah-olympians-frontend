import articleReducer from '../article';
import userReducer from '../user';

import { GETPROFILE, GETARTICLE } from '../../constants/action-types';

const initialState = {
  user_data: {
    profile: {},
  },
};

describe('Article reducer', () => {
  it('should return initial state if no action', () => {
    expect(articleReducer(undefined, {})).toEqual({ article: [] });
  });

  it('should return updated state of loading true is action in started', () => {
    expect(articleReducer(undefined, { type: GETARTICLE })).toEqual({
      article: undefined,
    });
  });
  it('should update article value in state if action is success', () => {
    expect(
      articleReducer(undefined, {
        type: GETARTICLE,
        data: { articles: 'successfull' },
      }),
    ).toEqual({ article: undefined });
  });
});

describe('User reducer', () => {
  it('should return initial state if no action', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should return updated state of user', () => {
    expect(userReducer(undefined, { type: GETPROFILE })).toEqual({
      article: undefined,
    });
  });
});
