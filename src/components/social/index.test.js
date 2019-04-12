import React from 'react';
import { shallow } from 'enzyme';
import SocialAuth from './index';

describe('<SocialAuth />', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('renders the <SocialAuth /> component', () => {
    const wrapper = shallow(<SocialAuth history={{ push() {} }} />);
    expect(wrapper.contains(<h3>Authors's Heaven</h3>));
  });
  it('Test handleSocialLogin is succesfull', () => {
    fetch.mockResponseOnce(JSON.stringify({ user: {} }));
    const wrapper = shallow(<SocialAuth history={{ push() {} }} />);
    wrapper.instance().handleSocialLogin({
      _provider: 'google',
      _token: {
        accessToken: 'fake-token',
      },
    });
  });
  it('Test handleSocialLoginFailure', () => {
    // SVGElement work around
    global.SVGElement = global.Element;
    fetch.mockResponseOnce(JSON.stringify({ user: {} }));
    const wrapper = shallow(<SocialAuth history={{ push() {} }} />);
    wrapper.instance().handleSocialLoginFailure();
  });
});
