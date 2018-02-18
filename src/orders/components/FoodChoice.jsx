import PropTypes from 'prop-types';
import React from 'react';

const FoodChoice = ({ foodName, translate, useDefault }) => {
  if (foodName) {
    return <span>{foodName}</span>;
  }
  if (useDefault) {
    return <span className="text-muted">{translate('orders.defaultFood')}</span>;
  }
  return <span className="text-danger">{translate('orders.foodNotSelected')}</span>;
};

FoodChoice.propTypes = {
  foodName: PropTypes.string,
  translate: PropTypes.func.isRequired,
  useDefault: PropTypes.bool,
};

FoodChoice.defaultProps = {
  foodName: null,
  useDefault: false,
};

export default FoodChoice;
