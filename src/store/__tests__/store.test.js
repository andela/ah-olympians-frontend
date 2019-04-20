import store from '../store';

const initialUser = {
  user_data: {
    profile: {},
  },
};

const initialState = { user: initialUser, article: { article: [] } };

describe('user store', () => {
  it('Should have store intitialized', () => {
    expect(store.getState().user).toEqual(initialState.user);
  });
});
