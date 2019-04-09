import React from 'react';
import jest from 'jest-mock';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GetArticle } from '../ViewArticle';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    fetchArticle: jest.fn(),
    anArticle: {},
    match: {
      params: {
        slug: 'new',
      },
    },
  };

  const enzymeWrapper = shallow(<GetArticle {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('HomePage', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setProps(
        {
          fetchArticle: jest.fn(),
          anArticle: {
            article: {
              slug: 'new',
              body: 'Just a test article',
              author: {
                username: 'tester',
              },
              created_at: '2019-04-10T13:30:20.231197Z',
            },
          },
          match: {
            params: {
              slug: 'new',
            },
          },
        },
      );

      expect(enzymeWrapper.find('header').hasClass('')).toBe(true);
      expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should render loading status before article loads', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setState({
        anArticle: [],
      });
      expect(enzymeWrapper.find('header').hasClass('')).toBe(true);
      expect(enzymeWrapper.containsMatchingElement(<h3>Loading...</h3>)).toBeTruthy();
    });
  });
});
