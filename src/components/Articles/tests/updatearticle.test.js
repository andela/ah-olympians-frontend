import React from 'react';
import { shallow } from 'enzyme';
import { EditorState } from 'draft-js';
import { EditArticle } from '../UpdateArticle';


function setup() {
  const props = {
    fetchArticle: jest.fn(),
    editArticle: jest.fn(),
    articleToUpdate: {},
    updatedArticle: {},
    match: {
      params: {
        slug: 'updated',
      },
    },
  };

  const enzymeWrapper = shallow(<EditArticle {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('EditArticle', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setProps({
        fetchArticle: jest.fn(),
        editArticle: jest.fn(),
        articleToUpdate: {},
        updatedArticle: {},
        history: {
          push: jest.fn(),
        },
        match: {
          params: {
            slug: 'updated',
          },
        },
      });

      expect(enzymeWrapper.find('header').hasClass('')).toBe(true);
      expect(enzymeWrapper.find('#this-container').length).toBe(1);
      expect(enzymeWrapper.find('textarea').hasClass('form-control')).toBe(true);
      expect(enzymeWrapper.find('.btn-success').length).toBe(1);

      enzymeWrapper.setState({
        tags: [{
          id: 'Authors Haven',
          text: 'Authors Haven',
        },
        ],
      });
      
      const tag = {
        id: 'New',
        text: 'New',
      };
      const spy = jest.spyOn(enzymeWrapper.instance(), 'handleDrag');
      enzymeWrapper.instance().handleDrag(tag);
      expect(spy).toBeCalledWith({
        id: 'New',
        text: 'New',
      });

      const spy2 = jest.spyOn(enzymeWrapper.instance(), 'handleDelete');
      enzymeWrapper.instance().handleDelete(0);
      expect(spy2).toBeCalledWith(0);

      const spy3 = jest.spyOn(enzymeWrapper.instance(), 'handleAddition');
      enzymeWrapper.instance().handleAddition(tag);
      expect(spy3).toBeCalledWith({
        id: 'New',
        text: 'New',
      });

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
    it('Should dispatch the editArticle function when the form is submitted with correct input', () => {
      const { enzymeWrapper } = setup();

      enzymeWrapper.setProps({
        fetchArticle: jest.fn(),
        editArticle: jest.fn(),
        articleToUpdate: {},
        updatedArticle: {},
        history: {
          push: jest.fn(),
        },
        match: {
          params: {
            slug: 'updated',
          },
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
      expect(enzymeWrapper.instance().props.editArticle).toHaveBeenCalled();
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
