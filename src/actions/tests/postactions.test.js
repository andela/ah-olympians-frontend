import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import { NEW_ARTICLE, FETCH_ARTICLE } from '../types';
import { createArticle, fetchArticle } from '../postArticles';

jest.mock('axios');

describe('testing new article', () => {
  it('tests posting a new article', () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.post.mockResolvedValue({
      data: {},
    });

    const expectedAction = [
      {
        type: NEW_ARTICLE,
        payload: {},
      },
    ];

    return store.dispatch(createArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests fetching a single article', () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});

    mockAxios.get.mockResolvedValue({
      response: {
        data: {},
      },
    });

    const expectedAction = [{
      type: FETCH_ARTICLE,
    }];
    return store.dispatch(fetchArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
