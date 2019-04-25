import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import { REPORT_ARTICLE, ACTION_FAILED } from '../types';
import { reportArticle } from '../reportArticle';


describe('testing report article', () => {
  it('tests reporting an article', () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.post.mockResolvedValue({
      data: {},
    });

    const expectedAction = [
      {
        type: REPORT_ARTICLE,
        payload: {},
      },
    ];

    return store.dispatch(reportArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it("dispatches REPORT_ARTICLE action and returns an error", async () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        error: "Something bad happened"
      })
    );
    
    try { 
      await store.dispatch(reportArticle());
    } catch {
      const actions = store.getActions();

      expect.assertions(1);

      const expectedAction = [
        {
          type: REPORT_ARTICLE,
          payload: {},
        },
      ];

      return store.dispatch(reportArticle({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    }
  });
});