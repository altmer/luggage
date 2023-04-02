import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => (!!localStorage.getItem('phoenixAuthToken'));

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        React.createElement(component, props)
      ) : (
        <Redirect to="/sign_in" />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
