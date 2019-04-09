import React from 'react';
import { shallow } from 'enzyme';
import { EditorState } from 'draft-js';
import { PostArticle } from '../PostArticle';


function setup() {
  const props = {
    createArticle: jest.fn(),
    newArticle: {},
    match: {
      path: '/articles/new',
      params: {},
    },
  };

  const enzymeWrapper = shallow(<PostArticle {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}


describe('components', () => {
  describe('PostArticle', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setProps({
        createArticle: jest.fn(),
        newArticle: {
          article: {
            slug: 'dummy',
          },
        },
        history: {
          push: jest.fn(),
        },
        match: {
          path: '/articles/new',
          params: {},
        },
      });

      expect(enzymeWrapper.find('header').hasClass('')).toBe(true);
      expect(enzymeWrapper.find('#this-container').length).toBe(1);
      expect(enzymeWrapper.find('textarea').hasClass('form-control')).toBe(true);
      expect(enzymeWrapper.find('.btn-success').length).toBe(1);

      const tag = {
        id: 'New',
        text: 'New',
      };
      const spy = jest.spyOn(enzymeWrapper.instance(), 'handleDrag');
      enzymeWrapper.instance().handleDrag(tag);
      expect(spy).toBeCalledWith({ id: 'New', text: 'New' });

      const spy2 = jest.spyOn(enzymeWrapper.instance(), 'handleDelete');
      enzymeWrapper.instance().handleDelete(0);
      expect(spy2).toBeCalledWith(0);

      const spy3 = jest.spyOn(enzymeWrapper.instance(), 'handleAddition');
      enzymeWrapper.instance().handleAddition(tag);
      expect(spy3).toBeCalledWith({ id: 'New', text: 'New' });

      const spy4 = jest.spyOn(enzymeWrapper.instance(), 'onEditorStateChange');
      const editorState = EditorState.createEmpty();
      enzymeWrapper.instance().onEditorStateChange(editorState);
      expect(spy4).toHaveBeenCalled();

      const spy5 = jest.spyOn(enzymeWrapper.instance(), 'onChange');
      const event = { target: { name: 'special', value: 'party' } };
      enzymeWrapper.instance().onChange(event);
      expect(spy5).toBeCalledWith({ target: { name: 'special', value: 'party' } });

      const spy6 = jest.spyOn(enzymeWrapper.instance(), 'handleChange');
      const event2 = { target: { name: 'special', value: 'party' } };
      enzymeWrapper.instance().handleChange(event2);
      expect(spy6).toBeCalledWith({ target: { name: 'special', value: 'party' } });
    });
    it('Should dispatch the createArticle function when the form is submitted with correct input', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setProps({
        createArticle: jest.fn(),
        newArticle: {
          article: {
            slug: 'dummy',
          },
        },
        history: {
          push: jest.fn(),
        },
        match: {
          path: '/articles/new',
          params: {},
        },
      });

      const event = {
        preventDefault: jest.fn(),
      };
      const state = {
        title: 'New',
        description: 'New',
        tags: [],
        editorState: EditorState.createEmpty(),
        errors: '',
      };
      enzymeWrapper.setState(state);
      enzymeWrapper.instance().onSubmit(event);
      expect(enzymeWrapper.instance().props.createArticle).toHaveBeenCalled();
    });
    test('expect image to be defined', () => {
      const { enzymeWrapper } = setup();
      const props = {
        image: 'image/pokeball',
      };
      expect(enzymeWrapper.instance().uploadImageCallBack(props)).toBeDefined();
    });
  });
});
