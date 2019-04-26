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
          errors: [],
          match: {
            params: {
              slug: 'new',
            },
          },
        },
      );

      expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should render loading status before article loads', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setState({
        anArticle: [],
      });

      expect(enzymeWrapper.containsMatchingElement(<h3>Loading...</h3>)).toBeTruthy();
    });
    it('Should redirect to edit article when button is clicked', () => {
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
          errors: [],
          match: {
            params: {
              slug: 'new',
            },
          },
          history: {
            push: jest.fn(),
          },
        },
      );

      const event = {
        preventDefault: jest.fn(),
      };
      const state = {
        anArticle: [{
          title: 'new',
          body: 'dummy',
          author: {
            username: 'user1',
          },
          created_at: '2019-04-25T11:05:47.274146Z',
          tags: ['tag1', 'tag2']
        }],
        currentUser: {
          user:{
            username: 'user1',
          },
        },
        errors: ''
      };
      enzymeWrapper.setState(state);
      enzymeWrapper.instance().onClick(event);
      expect(enzymeWrapper.instance().props.history.push).toHaveBeenCalled();
    });
  });
});
