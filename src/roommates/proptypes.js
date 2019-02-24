import PropTypes from 'prop-types'

import { ResourceId } from 'react-saga-rest/lib/proptypes'

export const Inhabitant = PropTypes.shape({
  id: ResourceId.isRequired,
  name: PropTypes.string.isRequired
})

export const Room = PropTypes.shape({
  id: ResourceId.isRequired,
  inhabitants: PropTypes.arrayOf(Inhabitant).isRequired,
  number: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
})
