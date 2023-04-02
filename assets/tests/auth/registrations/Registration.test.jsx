import React from 'react';
import renderer from 'react-test-renderer';

import { Registration } from '../../../js/auth/registrations/pages/Registration';

test('it renders form', () => {
  const signUpMock = jest.fn();
  const subject = renderer.create(
    <Registration
      signUp={signUpMock}
      errors={{}}
    />);
  const tree = subject.toJSON();
  expect(tree).toMatchSnapshot();
});

test('it renders form with errors', () => {
  const signUpMock = jest.fn();
  const subject = renderer.create(
    <Registration
      signUp={signUpMock}
      errors={{
        name: ['one name error', 'second error'],
        email: ['email error'],
        password: ['password error'],
        password_confirmation: ['password confirmation error'],
      }}
    />);
  const tree = subject.toJSON();
  expect(tree).toMatchSnapshot();
});
