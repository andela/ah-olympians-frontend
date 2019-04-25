import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from '../Home';


function setup() {
  const props = {
    getArticles: jest.fn(),
  };

  const enzymeWrapper = shallow(<HomePage {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('HomePage', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('header').hasClass('header')).toBe(false);

      expect(enzymeWrapper.find('CardColumns').text()).toBe('');

      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
