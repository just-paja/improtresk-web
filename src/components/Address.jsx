import PropTypes from 'prop-types'
import React from 'react'

const Address = ({ address }) => (
  <a href={`https://maps.google.com/?q=${address}`}>
    {address}
  </a>
)

Address.propTypes = {
  address: PropTypes.string.isRequired
}

export default Address
