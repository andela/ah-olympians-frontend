import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import ProfileForm from '../ProfileForm';

describe('<GatorMenu />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<ProfileForm />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
