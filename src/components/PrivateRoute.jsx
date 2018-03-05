import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import { Participant } from '../proptypes';
import { reverse } from '../routeTable';

const PrivateRoute = ({
  component: Component,
  participantState,
  lang,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if ((participantState.failed || participantState.valid) && !participantState.loading) {
        return participantState.data ?
          (<Component {...props} />) :
          (<Redirect to={reverse(lang, 'signup')} />);
      }
      return null;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  participantState: PropTypes.shape({
    data: Participant,
    failed: PropTypes.bool,
    loading: PropTypes.bool,
    valid: PropTypes.bool,
  }).isRequired,
  lang: PropTypes.string.isRequired,
};

PrivateRoute.defaultProps = {
};

export default PrivateRoute;
