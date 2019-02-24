import PropTypes from 'prop-types'
import qsm from 'query-string-manipulator'
import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { Participant } from '../proptypes'
import { reverse } from '../routeTable'

const PrivateRoute = ({
  component: Component,
  participantState,
  lang,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    path={path}
    render={(props) => {
      if ((participantState.failed || participantState.valid) && !participantState.loading) {
        return participantState.data
          ? (<Component {...props} />)
          : (
            <Redirect
              to={qsm(reverse(lang, 'signup'), {
                set: {
                  redirectTo: path
                }
              })}
            />
          )
      }
      return null
    }}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  participantState: PropTypes.shape({
    data: Participant,
    failed: PropTypes.bool,
    loading: PropTypes.bool,
    valid: PropTypes.bool
  }).isRequired,
  path: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired
}

export default PrivateRoute
