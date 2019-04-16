import React from 'react';
import { shallow } from 'enzyme';

import Followers from '../Followers';

describe('render Article View Container', () => {
  const wrapper = shallow(<Followers />);
  it('renders rate component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
