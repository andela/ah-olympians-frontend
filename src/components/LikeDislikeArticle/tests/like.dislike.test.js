import React from 'react';
import { shallow } from 'enzyme';
import { ArticleLiking } from '../like.dislike';

import { success, failure } from '../../../actions/likearticle';

import { LIKE_SUCCESSFUL, LIKE_FAILURE } from '../../../actions/types';
import * as types from '../../../actions/types';

import configureMockStore from 'redux-mock-store';
import { sendLike } from '../../../reducers/like.article.reducer';

const mockStore = configureMockStore();
const store = mockStore([]);
const payload = {};

describe('when an article is liked successful', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('Should create an action for liking an article successful', () => {
    const expectedActions = [
      {
        type: LIKE_SUCCESSFUL,
        payload,
      },
    ];
    store.dispatch(success(payload));
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActions).toEqual(expectedActions);
  });

  it('Should create an action when liking an article fails', () => {
    const expectedActions = [
      {
        type: LIKE_FAILURE,
        payload,
      },
    ];
    store.dispatch(failure(payload));
    const dispatchedActions = store.getActions();
    const actionTypes = dispatchedActions.map(action => action.type);
    expect(dispatchedActions).toEqual(expectedActions);
  });
});
describe('like article reducers', () => {
  it('should provide the initial state', () => {
    expect(sendLike(undefined, {})).toEqual({});
  });
  it('should change state on action type like request', () => {
    expect(
      sendLike(
        {},
        {
          type: types.LIKE_REQUEST,
          sending_like: true,
        },
      ),
    ).toEqual({
      sending_like: true,
    });
  });
  it('should change state on action type like successful', () => {
    expect(
      sendLike(
        {},
        {
          type: types.LIKE_SUCCESSFUL,
          payload: [],
        },
      ),
    ).toEqual({
      data: undefined,
      like: true,
      sending_like: false,
    });
  });
  it('should change state on action type like failure', () => {
    expect(
      sendLike(
        {},
        {
          type: types.LIKE_FAILURE,
          payload: [],
        },
      ),
    ).toEqual({
      error: [],
      failed: true,
      sendLike: false,
    });
  });

  function setup() {
    const props = {
      article: {
        article: {
          likes_count: null,
        },
      },
      match: {
        params: {
          slug: 'updated',
        },
      },
    };

    const enzymeWrapper = shallow(<ArticleLiking {...props} />);

    return {
      props,
      enzymeWrapper,
    };
  }

  describe(' like and dislike button  elements tests', () => {
    it('should render the article liking component without crashing', () => {
      const { enzymeWrapper } = setup();
      enzymeWrapper.setProps({
        article: {
          article: {
            likes_count: null,
          },
        },
      });
    });
  });
});
