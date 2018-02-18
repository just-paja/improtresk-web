import PropTypes from 'prop-types';
import React from 'react';

import HumanDate from '../../components/HumanDate';
import FoodChoice from './FoodChoice';

const OrderedMeal = ({
  useDefault,
  date,
  food,
  name,
  soup,
  translate,
}) => (
  <div>
    <h4>{translate(`orders.${name}`)} <HumanDate date={date} /></h4>
    <div>{translate('orders.soup')}: <FoodChoice foodName={soup} translate={translate} useDefault={useDefault} /></div>
    <div>{translate('orders.mainCourse')}: <FoodChoice foodName={food} translate={translate} useDefault={useDefault} /></div>
  </div>
);

OrderedMeal.propTypes = {
  date: PropTypes.string.isRequired,
  food: PropTypes.node,
  name: PropTypes.string.isRequired,
  soup: PropTypes.node,
  translate: PropTypes.func.isRequired,
  useDefault: PropTypes.bool,
};

OrderedMeal.defaultProps = {
  food: null,
  soup: null,
  useDefault: false,
};

export default OrderedMeal;
