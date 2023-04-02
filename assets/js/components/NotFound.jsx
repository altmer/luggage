import React from 'react';
import { Translate } from 'react-i18nify';

export const NotFound = () => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h3><Translate value="not_found.header" /></h3>
        <p><Translate value="not_found.description" /></p>
      </div>
    </div>
  </div>
);

export default NotFound;
