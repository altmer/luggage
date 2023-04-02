import React from 'react';
import { I18n } from 'react-i18nify';
import Form from 'react-formal';

const extract = (error) => {
  const key = error.message || error;
  return I18n.t(`errors.${key}`);
};

export const LocalizedFormMessage = props => (
  <Form.Message {...props} extract={extract} />
);

export default LocalizedFormMessage;
