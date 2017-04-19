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
    <h4>{names[name]} <HumanDate date={date} /></h4>
    <div>Polévka: {soup || <span className="text-danger">Zatím nevybráno</span>}</div>
    <div>Hlavní chod: {food || <span className="text-danger">Zatím nevybráno</span>}</div>
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
