import React from 'react';
import jest from 'jest-mock';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DropdownComponent } from './dropdown';

Enzyme.configure({ adapter: new Adapter() });

describe('component will render', () => {
  const props = {
    notifications: jest.fn(),
  };
  const user = {
    email: 'user@email.com',
    username: 'user1',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQsImV4cCI6MTU2MDc5MDQwMX0.IiKq2Fzbuhu424D3xBQrdSkZKzVx46bkALCgE4B4NaA',
  };

  const enzymeWrapper = shallow(<DropdownComponent {...props} />);

  it('get notifications', () => {
    // localStorage.setItem('user', JSON.stringify({ user }));
    const spy = jest.spyOn(enzymeWrapper.instance(), 'componentWillMount');
    enzymeWrapper.instance().componentWillMount();
    expect(spy).toHaveBeenCalled();
  });
});
