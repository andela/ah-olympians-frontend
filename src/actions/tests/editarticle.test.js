import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import { UPDATE_ARTICLE, ACTION_FAILED } from '../types';
import { editArticle } from '../editArticle';


describe('testing update article', () => {
  it('tests editing an existing article', () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.put.mockResolvedValue({
      data: {},
    });

    const expectedAction = [
      {
        type: UPDATE_ARTICLE,
        payload: {},
      },
    ];

    return store.dispatch(editArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it("dispatches UPDATE_ARTICLE action and returns an error", async () => {
    const testStore = configureMockStore([thunk]);
    const store = testStore({});
    mockAxios.put.mockImplementationOnce(() =>
      Promise.reject({
        error: "Something bad happened"
      })
    );
    
    try { 
      await store.dispatch(editArticle());
    } catch {
      const actions = store.getActions();

      expect.assertions(3);
      expect(actions[0].type).toEqual("UPDATE_ARTICLE");
      expect(actions[1].type).toEqual("ACTION_FAILED");
      expect(actions[1].payload.error).toEqual("Something bad happened");
    }
  });
});
