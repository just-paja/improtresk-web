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
  price: PropTypes.number,
};

Price.defaultProps = {
  freeMessage: 'generic.free',
  price: 0,
};

export default Price;
