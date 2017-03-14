import React, { PropTypes } from 'react';

import HumanDate from './humanDate';

const names = {
  lunch: 'Oběd',
  dinner: 'Večeře',
};

const Meal = ({ name, date }) => (
  <span>{names[name] || name} <HumanDate date={date} /></span>
);

Meal.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

Meal.defaultProps = {
  price: null,
};

export default Meal;
