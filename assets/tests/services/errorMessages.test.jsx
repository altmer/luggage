import React from 'react';
import errorMessages from '../../js/services/errorMessages';

test('it converts errors to html error messages', () => {
  const errors = {
    title: ['cant be blank'],
    email: ['wrong format', 'invalid'],
  };
  const subject = errorMessages(errors);
  expect(subject).toEqual({
    title: (<span className="error-message">cant be blank</span>),
    email: (<span className="error-message">wrong format, invalid</span>),
  });
});
