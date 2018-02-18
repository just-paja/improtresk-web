import PropTypes from 'prop-types';
import React from 'react';

const FoodMenuItem = ({ name }) => (
  <div>{name}</div>
);

FoodMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FoodMenuItem;
