import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Articles from '../Articles';
import store from '../../../store/store';

describe('render Article View Container', () => {
  const props = {
    article: null,
  };
  // let store = mockStore(storeStateMock);
  let container;
  const wrapper = mount(<Provider store={store}> <Articles {...props} /> </Provider>, container);
  it('renders article component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
