import React from 'react';
import { shallow } from 'enzyme';
import SocialShare from './index';

test('should test social sharing', () => {
  const wrapper = shallow(<SocialShare />);
  expect(wrapper).toMatchSnapshot();
});
