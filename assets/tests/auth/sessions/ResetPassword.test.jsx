import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { ResetPassword } from '../../../js/auth/sessions/pages/ResetPassword';

test('ResetPassword renders form with email and password fields', () => {
  const clearErrorsMock = jest.fn();
  const subject = renderer.create(
    <ResetPassword
      updatePassword={jest.fn()}
      clearErrors={clearErrorsMock}
      errors={{}}
      token="jwt"
    />);
  expect(subject.toJSON()).toMatchSnapshot();
  expect(clearErrorsMock).toHaveBeenCalled();
});

test('ResetPassword renders form with error message', () => {
  const subject = renderer.create(
    <ResetPassword
      updatePassword={jest.fn()}
      clearErrors={jest.fn()}
      errors={{ password_confirmation: ['Passwords are not same.'] }}
      token="jwt"
    />);
  expect(subject.toJSON()).toMatchSnapshot();
});

test('ResetPassword form submits passwords and token', () => {
  const updatePasswordMock = jest.fn();
  const subject = shallow(
    <ResetPassword
      updatePassword={updatePasswordMock}
      clearErrors={jest.fn()}
      errors={{}}
      token="jwt"
    />);
  subject.instance().submit({
    password: '12345678',
    password_confirmation: '12345678',
  });
  expect(updatePasswordMock).toHaveBeenCalledWith(
    'jwt',
    {
      password: '12345678',
      password_confirmation: '12345678',
    });
});
