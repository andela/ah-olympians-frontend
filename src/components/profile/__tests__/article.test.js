import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';

import Articles from '../Articles';
import store from '../../../store/store';

describe('render Article View Container', () => {
  it('renders article component correctly', async () => {
    const wrapper = await render(<Provider store={store}><Articles /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
