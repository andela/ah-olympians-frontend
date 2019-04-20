import React from 'react';
import { mount } from 'enzyme';
import {
  RequestResetForm,
  mapDispatchToProps,
  mapStateToProps,
} from '../components/ResetPassword/requestReset';


describe('Requestreset form elements tests', () => {
  let wrapper;
  const props = {
    requestPasswordDetails: {
      message: 'This is testing',
    },
  };

  beforeEach(() => {
    wrapper = mount(<RequestResetForm {...props} />);
  });

  it('should render the RequestResetForm without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it(
    'should change email state to the passed email when handleChange ' +
      'is called with an email parameter',
    () => {
      const email = 'test.email@andela.com';
      wrapper.setProps({
        message: 'Lalalalala',
      });
      wrapper.instance().handleChange({ target: { value: email } });
      expect(wrapper.state().email).toEqual(email);
    },
  );

  it('should return an object when mapStateToProps is called', () => {
    const state = {
      requestPassword: {
        message: 'this is testing',
      },
    };
    const stateToProps = mapStateToProps(state);
    expect(stateToProps.requestPasswordDetails).toEqual(state.requestPassword);
  });

  it('should return an object when mapDispatchToProps is called', () => {
    const dispatch = jest.fn();
    const dispatchToProps = mapDispatchToProps(dispatch);
    expect(typeof dispatchToProps).toEqual('object');
  });

  it('should actually work', () => {
    const nextProps = {
      requestPasswordDetails: {
        errors: 'This is testing an error',
      },
    };
    wrapper.setProps(nextProps);
    expect(wrapper.state().errors).toEqual(
      nextProps.requestPasswordDetails.errors,
    );
  });
});
