import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { FETCH_ARTICLES } from '../types';
import getArticles from '../getArticles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getArticles actions', () => {
  it('creates FETCH_ARTICLES after successfuly fetching articles', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [{
      type: FETCH_ARTICLES,
      payload: {},
    },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(getArticles()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
