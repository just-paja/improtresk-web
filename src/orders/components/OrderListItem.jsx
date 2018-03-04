import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import PropTypes from 'prop-types';
import React from 'react';

import HumanDate from '../../components/HumanDate';
import Price from '../../components/Price';

const OrderListItem = ({ createdAt, price }) => (
  <ListGroupItem>
    <HumanDate date={createdAt} />
    <Price price={price} />
  </ListGroupItem>
);

OrderListItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderListItem;
