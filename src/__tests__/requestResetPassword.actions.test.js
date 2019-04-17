
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import requestPassword from '../actions/requestPasswordReset';
import {success, failure} from '../actions/requestPasswordReset'

const mockStore = configureMockStore();
const store = mockStore([]);
const payload = { email: 'exampl' };

describe('when email is sent successful', () => {
  beforeEach(() => {
    store.clearActions();
  })
  it('should pass', () => {
    const expectedActions = [
      {
        type: 'EMAIL_SUCCESSFUL',
        payload,
      },
    ];
    store.dispatch(success(payload))
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActions).toEqual(expectedActions);
  });

  it('should fail', () => {
    const expectedActions = [
      {
        type: 'FAIL_SEND',
        payload,
      },
    ];
    store.dispatch(failure(payload))
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
