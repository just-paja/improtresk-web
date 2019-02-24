import React from 'react'

import LinkContainer from '../containers/LinkContainer'
import PermaLink from '../components/PermaLink'

import { Children } from '../proptypes'

const PermaLinkContainer = ({ children, ...props }) => (
  <PermaLink {...props} tag={LinkContainer}>
    {children}
  </PermaLink>
)

PermaLinkContainer.propTypes = {
  children: Children
}

PermaLinkContainer.defaultProps = {
  children: null
}

export default PermaLinkContainer
