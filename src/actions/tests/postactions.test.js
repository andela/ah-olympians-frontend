import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import { NEW_ARTICLE, FETCH_ARTICLE, ACTION_FAILED } from '../types';
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
  it("dispatches NEW_ARTICLE action and returns an error", async () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        error: "Something bad happened"
      })
    );
    
    try { 
      await store.dispatch(createArticle());
    } catch {
      const actions = store.getActions();

      expect.assertions(1);

      const expectedAction = [
        {
          type: NEW_ARTICLE,
          payload: {},
        },
      ];

      return store.dispatch(createArticle({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    }
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
  it("dispatches FETCH_ARTICLE action and returns an error", async () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject({
        error: "Something bad happened"
      })
    );
    
    try { 
      await store.dispatch(fetchArticle());
    } catch {
      const actions = store.getActions();

      expect.assertions(1);

      const expectedAction = [
        {
          type: FETCH_ARTICLE,
          payload: undefined,
        },
      ];

      return store.dispatch(fetchArticle({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    }
  });
});
