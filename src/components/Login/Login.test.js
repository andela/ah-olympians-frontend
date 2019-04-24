import React from 'react';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import loginReducer from '../../reducers/index';
import loginAction from '../../actions/index';
import { Login } from './Login';
import store from '../../store/store';

Enzyme.configure({ adapter: new Adapter() });

const wrongEmail = 'test@email.com';
const wrongPassword = 'passrd12';

const email = 'user@email.com';
const password = 'passw0rd';

const allReducer = combineReducers({ login: loginReducer });
const testStore = createStore(allReducer, applyMiddleware(thunk));

describe('component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  const props = { user: { errors: {} }, loginAction: jest.fn() };
  const loginComponent = shallow(<Login {...props} />);

  const emailInput = wrapper.find('#email');

  it('one button present initially', () => {
    expect(wrapper.find('button').length).toEqual(0);
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
});

describe('actions', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  it('Should show Login errors', async () => {
    const expectedErrors = 'Invalid email or password provided.';
    const expectedAction = {
      errors: expectedErrors,
      loggedIn: false,
      user: {},
    };
    await testStore.dispatch(loginAction(wrongEmail, wrongPassword));
    setTimeout(() => {
      expect(testStore.getState().login.login).resolves.toEqual(expectedAction);
    }, 3000);
  });
  it('Should show logged in true', async () => {
    const isLoggedIn = true;
    await testStore.dispatch(loginAction(email, password));
    expect(testStore.getState().login.login.loggedIn).toEqual(isLoggedIn);
  });
});
