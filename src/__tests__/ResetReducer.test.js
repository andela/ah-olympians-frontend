import { resetPassword, initialState } from '../reducers/resetPassword';
import * as types from '../actions/types';

describe('Resetpassword reducers', () => {
  it('should provide the initial state', () => {
    expect(resetPassword(undefined, {})).toEqual(initialState);
  });
  it('should change state on action type reset request', () => {
    expect(
      resetPassword({}, {
        type: types.RESET_REQUEST,
        payload: [],
      }),
    ).toEqual(
      {
      },
    );
  });
  it('should change state on action type reset successful', () => {
    expect(
      resetPassword({}, {
        type: types.RESET_SUCCESSFUL,
        payload: [],
      }),
    ).toEqual(
      {
        "message": []
      },
    );
  });
  it('should change state on action type reset failure', () => {
    expect(
      resetPassword({}, {
        type: types.RESET_FAILURE,
        payload: [],
      }),
    ).toEqual(
      {
        "message":[],
      },
    );
  });

});
