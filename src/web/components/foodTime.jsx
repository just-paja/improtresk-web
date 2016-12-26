import React, { PropTypes } from 'react';

import HumanDate from './humanDate';

const FoodTime = ({ name, date }) => (
  <span>{name} <HumanDate date={date} /></span>
);

FoodTime.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

FoodTime.defaultProps = {
  price: null,
};

export default FoodTime;
