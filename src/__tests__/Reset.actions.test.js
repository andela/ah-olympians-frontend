import {
  resetPasswordAction,
  success,
  failure,
} from '../actions/resetPassword';

import {
  RESET_SUCCESSFUL,
  RESET_FAILURE,
  RESET_REQUEST,
} from '../actions/types';

import configureMockStore from 'redux-mock-store';

import resetPassword from '../actions/resetPassword';

const mockStore = configureMockStore();
const store = mockStore([]);
const payload = { password: 'Password123' };


describe('when password is reset successful', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('Should create an action for reset password success', () => {
    const expectedActions = [
      {
        type: RESET_SUCCESSFUL,
        payload,
      },
    ];
    store.dispatch(success(payload));
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActions).toEqual(expectedActions);
  });

    it('Should create an action for reset password failure', () => {
      const expectedActions = [
        {
          type: RESET_FAILURE,
          payload,
        },
      ];
      store.dispatch(failure(payload));
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(dispatchedActions).toEqual(expectedActions);
    });

});
