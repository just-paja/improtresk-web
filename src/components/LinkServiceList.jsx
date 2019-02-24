import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import LinkService from './LinkService'

const LinkServiceList = ({
  inline,
  links
}) => (
  <ul
    className={classnames({
      'list-unstyled': !inline,
      'list-inline': inline
    })}
  >
    {links.map(link => (
      <li key={link.id}>
        <LinkService
          href={link.address}
          service={link.service}
        >
          {link.name}
        </LinkService>
      </li>
    ))}
  </ul>
)

LinkServiceList.propTypes = {
  inline: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    service: PropTypes.string,
    name: PropTypes.string.isRequired
  })).isRequired
}

LinkServiceList.defaultProps = {
  inline: false
}

export default LinkServiceList
