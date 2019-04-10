import React from 'react';
import { shallow } from 'enzyme';
import {
  ResetPassword,
  mapStateToProps,
} from '../components/ResetPassword/resetPassword';

describe('Request password form elements tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ResetPassword />);
  });

  it('should render the ResetPassword without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(
    'should change password state to the passed password when handleChange ' +
      'is called with a password parameter',
    () => {
      const password = 'Example1';
      wrapper
        .instance()
        .handleChange({ target: { id: 'password', value: password } });
      expect(wrapper.state().password).toEqual(password);
    },
  ),
    it(
      'should change message state to an error message when handleChange ' +
        ' is called with a blank password',
      () => {
        const message = 'Password cannot be empty';
        wrapper
          .instance()
          .handleChange({ target: { id: 'password', value: '' } });
        expect(wrapper.state().message).toEqual(message);
      },
    );

  it(
    'should change message state to a  message when handleChange ' +
      'is called with a password that does not meet requiremts of a password',
    () => {
      const message =
        'Password should be atleast 8 characters with a capital letter, a small letter and a number';
      wrapper
        .instance()
        .handleChange({ target: { id: 'password', value: 'rgy' } });
      expect(wrapper.state().message).toEqual(message);
    },
  );

  it(
    'should return message to null when handleChange ' +
      'is called with a password parameter and confirm password',
    () => {
      const password = 'Testing4';
      wrapper
        .instance()
        .handleChange({ target: { id: 'password', value: password } });
      wrapper
        .instance()
        .handleChange({ target: { id: 'confirmPassword', value: password } });
      expect(wrapper.state().message).toEqual(null);
    },
  );

  it(
    'should change state to a message when handleChange ' +
      'is called with a password parameter',
    () => {
      const password = 'Testing4';
      const message = 'Passwords do not match';
      wrapper.instance().handleChange({
        target: { id: 'password', value: password },
      });
      wrapper.instance().handleChange({
        target: { id: 'confirmPassword', value: 'wrongPassword4' },
      });
      expect(wrapper.state().message).toEqual(message);
    },
  );

  it('should  call spy when a wrapper is instanciated', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.setProps({
      resetPassword: () => Promise.resolve(),
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.instance().handleSubmit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should return a message on submit of a password that does not match the confirm password', () => {
    const message = "Passwords didn't match";
    const event = { preventDefault: jest.fn() };
    wrapper.setProps({
      resetPassword: () => Promise.resolve(),
    });
    wrapper.setState({
      password: 'Testing4',
      confirmPassword: 'WrongPassword4',
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().message).toEqual(message);
  });

  it('blah blah kul', () => {
    const state = {
      resetPassword: 'NewPassword',
    };
    const passwordReset = mapStateToProps(state);
    expect(passwordReset).toEqual(
      expect.objectContaining({
        passwordReset: expect.any(String),
      }),
    );
    expect(passwordReset.passwordReset).toEqual(state.resetPassword);
  });
});
