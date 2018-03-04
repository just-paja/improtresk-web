import ListGroup from 'reactstrap/lib/ListGroup';
import PropTypes from 'prop-types';
import React from 'react';

import { Order } from '../../proptypes';

import OrderListItem from './OrderListItem';

const OrderList = ({ orders }) => (
  <ListGroup>
    {orders.map(order => (
      <OrderListItem
        createdAt={order.createdAt}
        key={order.id}
        price={order.price}
      />
    ))}
  </ListGroup>
);

OrderList.propTypes = {
  orders: PropTypes.arrayOf(Order).isRequired,
};

export default OrderList;
