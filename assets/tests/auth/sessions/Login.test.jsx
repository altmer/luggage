import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { shallow } from 'enzyme';

import { Login } from '../../../js/auth/sessions/pages/Login';

test('Login renders form with email and password fields', () => {
  const subject = renderer.create(
    <MemoryRouter><Login
      signIn={jest.fn()}
      errors={{ error: null }}
    /></MemoryRouter>);
  expect(subject.toJSON()).toMatchSnapshot();
});

test('Login renders form with error message', () => {
  const subject = renderer.create(
    <MemoryRouter><Login
      signIn={jest.fn()}
      errors={{ error: 'Some error message. Auth failed.' }}
    /></MemoryRouter>);
  expect(subject.toJSON()).toMatchSnapshot();
});

test('Login form submits email and password', () => {
  const signInMock = jest.fn();
  const subject = shallow(
    <Login
      signIn={signInMock}
      errors={{ error: null }}
    />);
  subject.instance().submit({
    email: 'mail@mail.test',
    password: '12345678',
  });
  expect(signInMock).toHaveBeenCalledWith('mail@mail.test', '12345678');
});
