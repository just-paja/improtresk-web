import PropTypes from 'prop-types'
import React from 'react'

import { LinkContainer as BSContainer } from 'react-router-bootstrap'

import { reverse } from '../routeTable'
import { Children } from '../proptypes'

const LinkContainer = ({ children, lang, to, dispatch, params, ...other }) => (
  <BSContainer to={reverse(lang, to, params)} {...other}>
    {children}
  </BSContainer>
)

LinkContainer.propTypes = {
  children: Children,
  lang: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dispatch: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object,
  to: PropTypes.string.isRequired
}

LinkContainer.defaultProps = {
  children: null,
  dispatch: null,
  params: null
}

export default LinkContainer
