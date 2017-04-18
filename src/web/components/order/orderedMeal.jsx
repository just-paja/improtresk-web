import React, { PropTypes } from 'react';

import HumanDate from '../humanDate';

const names = {
  lunch: 'Oběd',
  dinner: 'Večeře',
};

const OrderedMeal = ({
  name,
  date,
  soup,
  food,
}) => (
  <div>
    <strong>{names[name]} <HumanDate date={date} /></strong>
    {soup ? <div>Polévka: {soup}</div> : null}
    {food ? <div>Hlavní chod: {food}</div> : null}
  </div>
);

OrderedMeal.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  food: PropTypes.string,
  soup: PropTypes.string,
};

OrderedMeal.defaultProps = {
  food: null,
  soup: null,
};

export default OrderedMeal;
