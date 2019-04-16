import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

import ProfileForm from '../ProfileForm';
import store from '../../../store/store';

describe('render Article View Container', () => {
  const props = {
    article: null,
  };
  let container;
  const wrapper = mount(<Provider store={store}><ProfileForm {...props} /> </Provider>, container);
  it('renders article component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
