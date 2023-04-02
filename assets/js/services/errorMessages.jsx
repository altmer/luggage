import React from 'react';

const errorMessages = errorsObject => (
  Object.keys(errorsObject).reduce((res, field) => (
    {
      ...res,
      [field]: (<span className="error-message">{errorsObject[field].join(', ')}</span>),
    }
  ), {})
);

export default errorMessages;
