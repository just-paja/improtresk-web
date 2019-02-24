import PropTypes from 'prop-types'
import React from 'react'

import HumanDate from '../../components/HumanDate'
import Message from '../../containers/Message'
import FoodChoice from './FoodChoice'

const OrderedMeal = ({
  useDefault,
  date,
  food,
  name,
  soup
}) => (
  <div>
    <strong><Message name={`orders.${name}`} /> <HumanDate date={date} /></strong>
    <div>
      <Message name='orders.soup' />: <FoodChoice foodName={soup} useDefault={useDefault} />
    </div>
    <div>
      <Message name='orders.mainCourse' />: <FoodChoice foodName={food} useDefault={useDefault} />
    </div>
  </div>
)

OrderedMeal.propTypes = {
  date: PropTypes.string.isRequired,
  food: PropTypes.node,
  name: PropTypes.string.isRequired,
  soup: PropTypes.node,
  useDefault: PropTypes.bool
}

OrderedMeal.defaultProps = {
  food: null,
  soup: null,
  useDefault: false
}

export default OrderedMeal
