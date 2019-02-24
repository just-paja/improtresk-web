import PropTypes from 'prop-types'
import React from 'react'

import HumanDate from '../../components/HumanDate'

const names = {
  lunch: 'Oběd',
  dinner: 'Večeře'
}

const Meal = ({ name, date }) => (
  <span>{names[name] || name} <HumanDate date={date} /></span>
)

Meal.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default Meal
