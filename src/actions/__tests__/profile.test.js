import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import { editProfile, getProfile, getArticle } from '../index';
import {
  EDITPROFILE,
  GETPROFILE,
  GETARTICLE,
} from '../../constants/action-types';

describe('testing edit profile', () => {
  it('tests edit profile', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    axios.put.mockResolvedValue({ data: {} });

    const expectedAction = [
      {
        type: EDITPROFILE,
        payload: {},
      },
    ];

    return store.dispatch(editProfile({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('tests get profile', () => {
    const jsdomAlert = window.alert;
    window.alert = () => {};
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    axios.get.mockResolvedValue({ response: { data: {} } });

    const expectedAction = [
      { type: GETPROFILE, payload: { profile: { profiles: {} } } },
    ];
    return store.dispatch(getProfile({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      window.alert = jsdomAlert;
    });
  });

  it('tests getArticle', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});

    axios.get.mockResolvedValue({ response: { data: {} } });

    const expectedAction = [
      {
        type: GETARTICLE,
        payload: undefined,
      },
    ];
    return store.dispatch(getArticle({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
