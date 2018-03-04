import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import { Participant } from '../proptypes';
import { reverse } from '../routeTable';

const PrivateRoute = ({
  component: Component,
  participant,
  lang,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (participant ?
      (<Component {...props} />) :
      (<Redirect to={reverse(lang, 'signup')} />)
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  participant: Participant,
  lang: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
  participant: null,
};

export default PrivateRoute;
