import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...other
}) => (
  <Route
    {...other}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (<Redirect to="/login" />)
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
