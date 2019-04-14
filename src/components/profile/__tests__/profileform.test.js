import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ProfileForm from '../ProfileForm';
import store from '../../../store/store';

describe('render profile View Container', () => {
  const props = {
    article: null,
  };
  let container;
  const wrapper = mount(<Provider store={store}><ProfileForm {...props} /> </Provider>, container);
  it('renders article component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
