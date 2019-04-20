import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount, render } from 'enzyme';
import ViewProfiles from '../viewprofiles';
import Followers from '../followers';
import Following from '../following';
import FollowButton from '../followButton';
import store from '../../../store/store';
import { GETPROFILE } from '../../../constants/action-types';
import { FETCH_FOLLOWERS } from '../../../actions/action_types';

const profile = {
  profiles: {
    user2: {
      username: 'user2',
      bio: 'am user 2',
      avatar: 'image/upload/v1551960935/books.png',
      interests: 'soccer',
      favorite_quote: '',
      website: '',
      following: true,
      username_id: 23,
    },
  },
};

const userprofiles = {
  followers: {
    user2: {
      username: 'user2',
      follow_since: '1 day, 14 hours',
    },
  },
  followers_count: 1,
};

const user = {
  email: 'user@email.com',
  username: 'user1',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQsImV4cCI6MTU2MDc5MDQwMX0.IiKq2Fzbuhu424D3xBQrdSkZKzVx46bkALCgE4B4NaA',
};

describe('ViewProfile', () => {
  it('Should display user profiles', async () => {
    localStorage.setItem('user', JSON.stringify({ user }));
    store.dispatch({ type: GETPROFILE, payload: { profile } });
    const viewprofiles = await mount(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <ViewProfiles />
              <Route path="/" component={ViewProfiles} exact />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>,
    );

    expect(viewprofiles).toMatchSnapshot();
    viewprofiles.unmount();
  });
});

describe('Followers', () => {
  it('Should display user followers', async () => {
    localStorage.setItem('user', JSON.stringify({ user }));
    store.dispatch({ type: GETPROFILE, payload: { profile } });
    store.dispatch({ type: FETCH_FOLLOWERS, payload: userprofiles });
    const viewfollowers = await render(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Followers />
              <Route path="/" component={Followers} exact />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>,
    );

    expect(viewfollowers).toMatchSnapshot();
  });
});

describe('Following', () => {
  it('Should display users a user follows', async () => {
    localStorage.setItem('user', JSON.stringify({ user }));
    store.dispatch({ type: GETPROFILE, payload: { profile } });
    store.dispatch({ type: FETCH_FOLLOWERS, payload: userprofiles });
    const viewfollowing = await render(
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Following />
              <Route path="/" component={Followers} exact />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>,
    );

    expect(viewfollowing).toMatchSnapshot();
  });
});

describe('Follow Button', () => {
  it('Should render follow button', async () => {
    const statusFollow = true;
    const followbutton = await render(
      <Provider store={store}>
        <FollowButton followStatus={statusFollow} userId={23} />
      </Provider>,
    );

    expect(followbutton).toMatchSnapshot();
  });

  it('Should perform click', async () => {
    localStorage.setItem('user', JSON.stringify(user));
    const jsdomAlert = window.alert;
    window.alert = () => {};
    const statusFollow = true;
    const followbutton = await mount(
      <Provider store={store}>
        <FollowButton followStatus={statusFollow} userId={14} />
      </Provider>,
    );

    const createdButton = followbutton.find('button');
    await createdButton.simulate('click');
    window.alert = jsdomAlert;
    expect(createdButton.text()).toEqual('Follow');

    createdButton.simulate('click');
    expect(createdButton.text()).toEqual('Unfollow');
    followbutton.unmount();
    window.alert = jsdomAlert;
  });
});
