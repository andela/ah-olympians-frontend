import articlesReducer from '../articlesReducer';

import {
  NEW_ARTICLE, FETCH_ARTICLE, FETCH_ARTICLES, UPDATE_ARTICLE, AUTHENTICATION_FAILED,
} from '../../actions/types';


describe('articles reducer', () => {
  it('should return initial state if no action', () => {
    expect(articlesReducer(undefined, {})).toEqual({
      item: { article: {} },
      items: [],
      update_item: {},
      errors: [],
    });
  });

  it('should handle FETCH_ARTICLE', () => {
    expect(articlesReducer({
      item: {
        data: 'here',
      },
      items: [],
      update_item: {},
      errors: [],
    }, {
      item: {
        type: FETCH_ARTICLE,
        item: {},
      },
    })).toEqual({
      item: {
        data: 'here',
      },
      items: [],
      update_item: {},
      errors: [],
    });
  });

  it('should handle FETCH_ARTICLES', () => {
    expect(articlesReducer({
      item: {},
      items: ['a', 'b'],
      update_item: {},
      errors: [],
    },
    {
      items: {
        type: FETCH_ARTICLES,
        items: [],
      },
    })).toEqual({
      item: {},
      items: ['a', 'b'],
      update_item: {},
      errors: [],
    });
  });

  it('should handle NEW_ARTICLE', () => {
    expect(articlesReducer({
      item: {
        data: 'new article',
      },
      items: [],
      update_item: {},
    }, {
      item: {
        type: NEW_ARTICLE, item: {},
      },
    })).toEqual({
      item: {
        data: 'new article',
      },
      items: [],
      update_item: {},
    });
  });

  it('should handle UPDATE_ARTICLE', () => {
    expect(articlesReducer({
      item: {},
      items: [],
      update_item: {
        data: 'new article',
      },
    }, {
      update_item: {
        type: UPDATE_ARTICLE, update_item: {},
      },
    })).toEqual({
      item: {},
      items: [],
      update_item: {
        data: 'new article',
      },
    });
  });
  it('should change state on action type auth fail', () => {
    expect(
      articlesReducer({}, {
        type: AUTHENTICATION_FAILED,
      }),
    ).toEqual(
      {
        errors: undefined,
        authenticated: false,
      },
    );
  });
});
