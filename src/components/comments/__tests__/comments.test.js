import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, mount } from 'enzyme';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import Comments from '../comments';
import CommentBox from '../commentBox'
import { CommentOnComment, CommentOnArticle, editComment } from '../../../actions/comments';
import commentReducer from '../../../reducers/comments';
import store from '../../../store/store';


const mockStore = configureMockStore([thunk]);

const initialState = {
  comments: {
    comments: [],
    commentsCount: 0,
  },
  addedComment: {},
};

const user = {
  email: 'user@email.com',
  username: 'user1',
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQsImV4cCI6MTU2MDc5MDQwMX0.IiKq2Fzbuhu424D3xBQrdSkZKzVx46bkALCgE4B4NaA',
};

describe('Comments', () => {
  it('Should display comments', async () => {
    localStorage.setItem('user', JSON.stringify({ user }));
    const comments = await render(<Provider store={store}><Comments article="test-article" /></Provider>);
    expect(comments).toMatchSnapshot();
  });
});

describe('Comments Box', () => {
  it('Should display coment box', async () => {
    localStorage.setItem('user', JSON.stringify({ user }));
    const commentsBox = await mount(
      <Provider store={store}>
        <CommentBox
          inputValue="wasafi"
          commentId="39"
        />
      </Provider>,
    );
    const InputForm = commentsBox.find('form');
    InputForm.simulate('submit');
    expect(store.getState().comments.comments).toEqual({});
    commentsBox.unmount();
  });

  it('Should display coment box', async () => {
    localStorage.setItem('user', JSON.stringify({ user }));
    const commentsBox = await mount(
      <Provider store={store}>
        <CommentBox
          inputValue="wasafi"
          commentId="39"
        />
      </Provider>,
    );
    const InputForm = commentsBox.find('#body');
    InputForm.simulate('change');
    expect(store.getState().comments.comments).toEqual({});
    commentsBox.unmount();
  });
});

describe('Actions', () => {
  it('comment on comment', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: 'COMMENT_ON_COMMENT',
        payload: {},
      },
      {
        type: 'FETCH_COMMENTS',
        payload: {},
      },
    ];

    const testStore = mockStore({ payload: {} });

    return testStore.dispatch(CommentOnComment('slug', 23, 'wsafi')).then(() => {
      // return of async actions
      expect(testStore.getActions()).toEqual(expectedActions);
    });
  });

  it('comment on article', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: 'COMMENT_ON_ARTICLE',
        payload: {},
      },
      {
        type: 'FETCH_COMMENTS',
        payload: {},
      },
    ];

    const testStore = mockStore({ payload: {} });

    return testStore.dispatch(CommentOnArticle('slug', 'wsafi')).then(() => {
      // return of async actions
      expect(testStore.getActions()).toEqual(expectedActions);
    });
  });

  it('edit', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: 'EDIT_COMMENT',
        payload: {},
      },
      {
        type: 'FETCH_COMMENTS',
        payload: {},
      },
    ];

    const testStore = mockStore({ payload: {} });

    return testStore.dispatch(editComment('slug', 23, 'wsafi')).then(() => {
      // return of async actions
      expect(testStore.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Comments Reducers', () => {
  it('Should return initial state', () => {
    expect(commentReducer(initialState)).toEqual(initialState);
  });


  it('Should coment on article', () => {
    const comment = { body: 'omega' };
    initialState.addedComment = comment;
    expect(
      commentReducer(initialState, { type: 'COMMENT_ON_ARTICLE', payload: comment }),
    ).toEqual(initialState);
  });
});
