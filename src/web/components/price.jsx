import React, { PropTypes } from 'react';

const Price = ({ freeMessage, price }) => (
  price ?
    <span>{price} Kč</span> :
    <span>{freeMessage}</span>
);

Price.propTypes = {
  freeMessage: PropTypes.string,
  price: PropTypes.number.isRequired,
};

Price.defaultProps = {
  freeMessage: 'Zdarma',
};

export default Price;
