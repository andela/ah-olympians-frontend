import React from 'react';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import loginAction from '../../actions/index';
import { Login } from './Login';
import { loginConstants } from '../../constants';
import loginReducer from '../../reducers/login.reducer';

Enzyme.configure({ adapter: new Adapter() });

const email = 'user@email.com';
const password = 'passw0rd';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('component', () => {
  const wrapper = shallow(<Login />);
  const props = { user: { errors: {} }, loginAction: jest.fn() };
  const loginComponent = shallow(<Login {...props} />);

  it('one button present initially', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('present', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Test submit', () => {
    const state = { email, password };
    const event = {
      preventDefault: jest.fn(),
    };
    const loginInstance = loginComponent.instance();

    loginInstance.setState(state);
    loginInstance.handleSubmit(event);

    expect(loginInstance.state.email).toEqual(email);
  });
  it('invalid email', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'email',
        value: 'email',
      },
    };
    const wrapperInstance = loginComponent.instance();
    // wrapperInstance.setState(state);
    wrapperInstance.handleChange(event);
    expect(wrapperInstance.state.formErrors.email).toEqual(
      'invalid email address',
    );
  });

  it('should redirect', () => {
    wrapper.setState({
      show: false,
      close: true,
      notifications: {},
    });

    const newProps = {
      user: {
        errors: '',
      },
      history: {
        push: jest.fn(),
      },
      loginAction: jest.fn(),
    };

    const spy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(newProps);
    expect(spy).toBeCalledWith(newProps);
  });

  it('should close alert', () => {
    wrapper.setState({
      show: true,
    });

    const spy = jest.spyOn(wrapper.instance(), 'onAlertClose');
    wrapper.instance().onAlertClose();
    expect(spy).toHaveBeenCalled();
  });
});

describe('actions', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  it('creates NOTIFY_SUCCESS after successfully fetching notifications', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user: {},
        },
      });
    });

    const expectedActions = [
      {
        type: loginConstants.LOGIN_SUCCESS,
        payload: {},
      },
    ];

    const store = mockStore({
      payload: {},
    });

    return store.dispatch(loginAction()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('it dispatches login failure', async () => {
    const errResp = {
      status: 400,
      response: { message: 'problem' },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(errResp);
    });

    const expectedActions = [
      {
        type: loginConstants.LOGIN_FAILURE,
        payload: {},
      },
    ];

    const store = mockStore({
      payload: {},
    });

    return store.dispatch(loginAction()).catch(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Test reducer', () => {
  const initialState = {
    loggedIn: false,
    user: {},
  };

  it('return initial state if no action', () => {
    expect(loginReducer(initialState, {})).toEqual({
      loggedIn: false,
      user: {},
    });
  });

  it('return LOGIN_SUCCESS', () => {
    expect(
      loginReducer(initialState, {
        type: loginConstants.LOGIN_SUCCESS,
        payload: {
          user: {},
        },
      }),
    ).toEqual({
      loggedIn: true,
      user: {
        user: {},
      },
      errors: '',
    });
  });

  it('return LOGIN_FAILURE', () => {
    const errors = 'Invalid email or password';
    expect(
      loginReducer(initialState, {
        type: loginConstants.LOGIN_FAILURE,
        error: errors,
      }),
    ).toEqual({
      loggedIn: false,
      user: {},
      errors,
    });
  });
});
