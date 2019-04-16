import React from 'react';
import { shallow } from 'enzyme';

import Approuter from '../Approuter';

describe('render Article View Container', () => {
  const wrapper = shallow(<Approuter />);
  it('renders rate component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
