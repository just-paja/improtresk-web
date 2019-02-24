import React from 'react'
import PropTypes from 'prop-types'

import { Order } from '../../proptypes'

const ImprovAge = ({ orders }) => (
  <span>{Math.max(0, orders.filter(order => order.paid).length - 1)}</span>
)

ImprovAge.propTypes = {
  orders: PropTypes.arrayOf(Order).isRequired
}

export default ImprovAge
