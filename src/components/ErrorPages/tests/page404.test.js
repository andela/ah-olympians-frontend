import React from 'react';
import { shallow } from 'enzyme';
import Page404 from '../Page404';

test('Should render 404 Page', () => {
  const wrapper = shallow(<Page404 />);
  expect(wrapper).toMatchSnapshot();
});