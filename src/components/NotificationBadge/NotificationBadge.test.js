import React from 'react';
import jest from 'jest-mock';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { getNotifications } from '../../actions/notifications.actions';
import { notificationConstants } from '../../constants';
import notificationReducer from '../../reducers/notifications.reducer';
import NotificationBadge, {
  NotificationBadgeComponent,
} from './NotificationBadge';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup() {
  const props = {
    notify: {},
  };

  const enzymeWrapper = mount(<NotificationBadgeComponent {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('getNotifications actions', () => {
  it('creates NOTIFY_SUCCESS after successfully fetching notifications', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {
        type: notificationConstants.NOTIFY_SUCCESS,
        payload: {},
      },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(getNotifications()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('App', () => {
  it('Should render without crashing', () => {
    const app = shallow(<NotificationBadge />);
    expect(app.length).toBe(1);
  });
});

describe('NotificationBadgeComponent', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();

    const spy = jest.spyOn(enzymeWrapper.instance(), 'handleClose');
    enzymeWrapper.instance().handleClose();
    expect(spy).toHaveBeenCalled();

    enzymeWrapper.setState({
      show: false,
      close: true,
      notifications: {},
    });
    const target = '<i class="fa fa-bell fa-2x icon-blue"></i>';

    const spy1 = jest.spyOn(enzymeWrapper.instance(), 'handleClick');
    enzymeWrapper.instance().handleClick(target);
    expect(spy1).toBeCalledWith('<i class="fa fa-bell fa-2x icon-blue"></i>');

    const nextProps = {
      notify: {
        first: {
          username: 'one',
          notification: 'First notification',
          slug: 'one',
        },
      },
    };

    const spy3 = jest.spyOn(
      enzymeWrapper.instance(),
      'componentWillReceiveProps',
    );
    enzymeWrapper.instance().componentWillReceiveProps(nextProps);
    expect(spy3).toBeCalledWith(nextProps);
  });
});

describe('Actions', () => {
  const initialState = {
    notifications: {},
  };
  it('return initial state if no action', () => {
    expect(notificationReducer(initialState, {})).toEqual({
      notifications: {},
    });
  });

  it('return NOTIFICATION_SUCCESS', () => {
    const notifications = 'success';
    expect(
      notificationReducer(initialState, {
        type: notificationConstants.NOTIFY_SUCCESS,
        payload: notifications,
      }),
    ).toEqual({
      notifications,
    });
  });
});
