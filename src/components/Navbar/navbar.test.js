import React from 'react';
import { shallow } from 'enzyme';
import NavbarInstance from './Navbar';

test('Should render Navbar', () => {
  const wrapper = shallow(<NavbarInstance />);
  expect(wrapper).toMatchSnapshot();
});
