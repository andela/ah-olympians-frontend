import React from 'react';
import { shallow } from 'enzyme';

import Loading from '../Loading';

describe('render Article View Container', () => {
  const wrapper = shallow(<Loading />);
  it('renders rate component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
