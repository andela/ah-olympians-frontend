import React from 'react';

import store from '../store';

const initialState = { user: { user_data: {} }, article: { article: [] } };

describe('user store', () => {
  it('Should have store intitialized', () => {
    expect(store.getState().user).toEqual(initialState.user);
  });
});
