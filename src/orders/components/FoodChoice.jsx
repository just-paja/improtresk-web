import PropTypes from 'prop-types'
import React from 'react'

import Message from '../../containers/Message'

const FoodChoice = ({ foodName, useDefault }) => {
  if (foodName) {
    return <span>{foodName}</span>
  }
  if (useDefault) {
    return <span className='text-muted'><Message name='orders.defaultFood' /></span>
  }
  return <span className='text-danger'><Message name='orders.foodNotSelected' /></span>
}

FoodChoice.propTypes = {
  foodName: PropTypes.string,
  useDefault: PropTypes.bool
}

FoodChoice.defaultProps = {
  foodName: null,
  useDefault: false
}

export default FoodChoice
