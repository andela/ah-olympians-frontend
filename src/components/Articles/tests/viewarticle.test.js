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
    errors: [],
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
          history: {
            push: jest.fn(),
          },
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
          currentUser: {
            user: {
              username: 'tester',
            }
          },
          match: {
            params: {
              slug: 'new',
            },
          },
        },
      );

      expect(enzymeWrapper).toMatchSnapshot();

      const spy = jest.spyOn(enzymeWrapper.instance(), 'onChange');
      const event = { target: { name: 'special', value: 'party' } };
      enzymeWrapper.instance().onChange(event);
      expect(spy).toBeCalledWith({ target: { name: 'special', value: 'party' } });

      enzymeWrapper.instance().handleClose();
      expect(enzymeWrapper.instance().state.modalShow).toBe(false);

      enzymeWrapper.instance().handleShow();
      expect(enzymeWrapper.instance().state.modalShow).toBe(true);


      const event2 = {
        preventDefault: jest.fn(),
      };
      enzymeWrapper.instance().onClick(event2);
      expect(enzymeWrapper.instance().props.history.push).toHaveBeenCalled();
    });
    it('should render loading status before article loads', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setState({
        anArticle: [],
      });

      expect(enzymeWrapper.containsMatchingElement(<h3>Loading...</h3>)).toBeTruthy();
    });
    it('should render error message if submit is clicked without selecting an option', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setState({
        anArticle: [],
        reportMessage: undefined,
      });

      const event = {
        preventDefault: jest.fn(),
      };

      expect(enzymeWrapper.instance().state.emptyForm).toBe(false);

      enzymeWrapper.instance().onSubmit(event);
      expect(enzymeWrapper.instance().state.emptyForm).toBe(true);
    });
    it('Should dispatch the reportArticle function when the form is submitted with correct input', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setProps({
        reportArticle: jest.fn(),
        history: {
          push: jest.fn(),
        },
        match: {
          path: '/articles/new',
          params: {
            slug: 'dummy',
          },
        },
      });

      const event = {
        preventDefault: jest.fn(),
      };
      const state = {
        reportMessage: 'test message',
      };
      enzymeWrapper.setState(state);
      enzymeWrapper.instance().onSubmit(event);
      expect(enzymeWrapper.instance().props.reportArticle).toHaveBeenCalled();
    });
  });
});