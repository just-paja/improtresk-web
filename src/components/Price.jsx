import PropTypes from 'prop-types';
import React from 'react';

import Message from '../containers/Message';

const Price = ({ freeMessage, price }) => (
  price ?
    <span>{price} Kč</span> :
    <Message name={freeMessage} />
);

Price.propTypes = {
  freeMessage: PropTypes.string,
  price: PropTypes.number.isRequired,
};

Price.defaultProps = {
  freeMessage: 'price.free',
};

export default Price;
