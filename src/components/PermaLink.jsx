import PropTypes from 'prop-types'
import React from 'react'

import { remove } from 'diacritics'
import { ResourceId } from 'react-saga-rest/lib/proptypes'

import Link from '../containers/Link'

import { Children } from '../proptypes'

const transformToSlug = str =>
  remove(str)
    .replace(/[\s-]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .substr(0, 48)

const PermaLink = ({ id, children, title, tag, to, routeParams, ...other }) => {
  const LinkComponent = tag || Link
  return (
    <LinkComponent
      to={to}
      params={{
        ...routeParams,
        slug: `${transformToSlug(title)}-${id}`
      }}
      {...other}
    >
      {children}
    </LinkComponent>
  )
}

PermaLink.propTypes = {
  children: Children,
  id: ResourceId.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  routeParams: PropTypes.object,
  tag: PropTypes.func,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}

PermaLink.defaultProps = {
  children: null,
  routeParams: null,
  tag: null
}

export default PermaLink
