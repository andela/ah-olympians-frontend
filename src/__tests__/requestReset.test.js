import { requestPassword, initialState } from '../reducers/requestPasswordReset';
import * as types from '../actions/types';

describe('requestPassword reducers', () => {
  it('should provide the initial state', () => {
    expect(requestPassword(undefined, {})).toEqual(initialState);
  });
  it('should change state on action type email send', () => {
    expect(
      requestPassword({}, {
        type: types.EMAIL_SEND,
        payload: [],
      }),
    ).toEqual(
      {
        "errors": null,
        "message":[]
      },
    );
  });
  it('should change state on action type fail send', () => {
    expect(
      requestPassword({}, {
        type: types.FAIL_SEND,
        payload: [],
      }),
    ).toEqual(
      {
        "errors": [],
        "message":""
      },
    );
  });

});
