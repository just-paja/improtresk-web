import React from 'react'
import PropTypes from 'prop-types'

import Message from '../../containers/Message'

const InputDescription = ({ rawLabel, text }) => (
  (!rawLabel && typeof text === 'string') ? <Message name={text} /> : text
)

InputDescription.propTypes = {
  rawLabel: PropTypes.bool,
  text: PropTypes.node.isRequired
}

InputDescription.defaultProps = {
  rawLabel: false
}

export default InputDescription
