import React from 'react';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import registerReducer from '../../reducers/register';
import * as actions from '../../actions/index';
import Register from './register';
import store from '../../store/store';
import Approuter from '../../routers/Approuter';

const initialState = {
  user: {},
  errors: {
    username: [],
    email: [],
    password: [],
  },
  submittable: true,
  successful: false,
};

const rootReducer = combineReducers({ registerUser: registerReducer });
const testStore = createStore(rootReducer, applyMiddleware(thunk));

describe('actions', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  it('Should change submitable status', async () => {
    const submitStatus = false;
    const expectedAction = {
      type: 'REGISTER_SUBMITTABLE',
      payload: submitStatus,
    };

    const returnAction = await testStore.dispatch(
      actions.submitStatus(submitStatus),
    );
    expect(returnAction).toEqual(expectedAction);
  });

  it('Should change successful status', async () => {
    const expectedAction = {
      type: 'REGISTER_SUCCESS',
      payload: true,
    };
    const returnAction = testStore.dispatch(actions.registerSuccess());
    expect(returnAction).toEqual(expectedAction);
  });

  it('Should show username errors', async () => {
    const user = {
      username: '',
      email: 'osogo@gmail.com',
      password: '23456789qwetu',
    };
    const expectedErrors = {
      email: [],
      password: [],
      username: ['A username is required to complete registration'],
    };

    return testStore.dispatch(actions.registerUser(user)).then(() => {
      setTimeout(() => {
        expect(testStore.getState().registerUser.errors).toEqual(
          expectedErrors,
        );
      }, 3000);
    });
  });

  it('Should show email errors', async () => {
    const user = {
      username: 'osogo',
      email: '',
      password: '23456789qwetu',
    };
    const expectedErrors = {
      email: ['Email must be provided to complete registration'],
      password: [],
      username: [],
    };

    return testStore.dispatch(actions.registerUser(user)).then(() => {
      setTimeout(() => {
        expect(testStore.getState().registerUser.errors).toEqual(
          expectedErrors,
        );
      }, 3000);
    });
  });

  it('Should show password errors', async () => {
    const user = {
      username: 'osogo',
      email: 'osogo@gmail.com',
      password: '',
    };
    const expectedErrors = {
      email: [],
      password: ['A password is required to complete registration'],
      username: [],
    };

    return testStore.dispatch(actions.registerUser(user)).then(() => {
      setTimeout(() => {
        expect(testStore.getState().login.login).resolves.toEqual(
          expectedErrors,
        );
      }, 3000);
    });
  });
});

describe('store', () => {
  it('Should have store intitialized', () => {
    expect(store.getState().registerUser).toEqual(initialState);
  });
});

describe('Reducers', () => {
  it('Should return initial state', () => {
    expect(registerReducer(initialState)).toEqual(initialState);
  });

  it('Should return current state', () => {
    expect(registerReducer(initialState, { type: 'UNKNOWN_TYPE' })).toEqual(
      initialState,
    );
  });

  it('Should update user', () => {
    const user = { username: 'omega' };
    expect(
      registerReducer(initialState, { type: 'REGISTER_USER', payload: user })
        .user,
    ).toEqual(user);
  });

  it('Should update rigistration errors', () => {
    const errors = { username: ['username not valid'] };
    expect(
      registerReducer(initialState, { type: 'REGISTER_ERROR', payload: errors })
        .errors,
    ).toEqual(errors);
  });
});

describe('Register', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('Should display registration page', () => {
    act(() => {
      ReactDOM.render(
        <Provider store={testStore}>
          <Register />
        </Provider>,
        container,
      );
    });

    const label = container.querySelector('p');
    expect(label.textContent).toBe('Already Registered? Login');
  });
});

describe('Register states', () => {
  it('Should handle change input', async (done) => {
    const expectedErrors = {
      email: [],
      password: ['A password is required to complete registration'],
      username: [],
    };

    const registerPage = mount(
      <Provider store={testStore}>
        <Register />
      </Provider>,
    );

    const userInput = registerPage.find('#username');
    const emailInput = registerPage.find('#email');
    const passwordInput = registerPage.find('#password');
    userInput.simulate('change');
    emailInput.simulate('change');
    passwordInput.simulate('change');
    setTimeout(() => {
      expect(registerPage.state().store.getState().registerUser.errors).toEqual(
        expectedErrors,
      );
      expect(
        registerPage.props().store.getState().registerUser.submittable,
      ).toEqual(true);
    }, 3000);
    done();
    registerPage.unmount();
  });

  it('Should handle form sumbit', async (done) => {
    const expectedErrors = {
      email: [],
      password: ['A password is required to complete registration'],
      username: [],
    };

    const registerPage = await mount(
      <Provider store={testStore}>
        <Register />
      </Provider>,
    );

    const regiterForm = registerPage.find('form');
    regiterForm.simulate('submit');
    setTimeout(() => {
      expect(registerPage.state().store.getState().registerUser.errors).toEqual(
        expectedErrors,
      );
      expect(
        registerPage.props().store.getState().registerUser.submittable,
      ).toEqual(true);
    }, 3000);
    done();
    registerPage.unmount();
  });

  it('Should handle confirmpassword', async (done) => {
    const expectedErrors = {
      email: [],
      password: ['A password is required to complete registration'],
      username: [],
    };

    const registerPage = await mount(
      <Provider store={testStore}>
        <Register />
      </Provider>,
    );

    const regiterForm = registerPage.find('#conPassword');
    regiterForm.simulate('change');
    setTimeout(() => {
      expect(registerPage.state().store.getState().registerUser.errors).toEqual(
        expectedErrors,
      );
      expect(
        registerPage.props().store.getState().registerUser.submittable,
      ).toEqual(true);
    }, 3000);
    done();
    registerPage.unmount();
  });
});

describe('Register states', () => {
  it('Should render home page', async (done) => {
    const homepage = await mount(
      <Provider store={testStore}>
        <Approuter />
      </Provider>,
    );

    expect(homepage).toMatchSnapshot();
    done();
    homepage.unmount();
  });
});

describe('Register components', () => {
  it('Should render all components', async (done) => {
    const registerPage = await mount(
      <Provider store={testStore}>
        <Register />
      </Provider>,
    );

    expect(registerPage.find('.alert').exists()).toBeTruthy();
    expect(registerPage.find('.page-header').exists()).toBeTruthy();
    expect(registerPage.find('.text-danger').exists()).toBeTruthy();
    done();
    registerPage.unmount();
  });
});
