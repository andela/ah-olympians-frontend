import React from 'react';
import { shallow } from 'enzyme';

import Profile from '../Profile';

describe('render profile View Container', () => {
  const wrapper = shallow(<Profile />);
  it('renders profile component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
