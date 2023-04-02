import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { ForgotPassword } from '../../../js/auth/sessions/pages/ForgotPassword';

test('ForgotPassword renders form with email field', () => {
  const subject = renderer.create(
    <ForgotPassword
      resetPassword={jest.fn()}
    />);
  expect(subject.toJSON()).toMatchSnapshot();
});

test('ForgotPassword form submits passwords and token', () => {
  const resetPasswordMock = jest.fn();
  const subject = shallow(
    <ForgotPassword
      resetPassword={resetPasswordMock}
    />);
  subject.instance().submit({
    email: 'email@mail.test',
  });
  expect(resetPasswordMock).toHaveBeenCalledWith('email@mail.test');
});
