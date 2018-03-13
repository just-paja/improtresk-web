import ListGroup from 'reactstrap/lib/ListGroup';
import PropTypes from 'prop-types';
import React from 'react';

import { Order } from '../../proptypes';

import Message from '../../containers/Message';
import OrderListItem from './OrderListItem';

const OrderList = ({ orders }) => (orders.length > 0 ? (
  <div>
    <hr />
    <h2><Message name="orders.history" /></h2>
    <ListGroup>
      {orders.filter(order => order.reservation).map(order => (
        <OrderListItem
          key={order.id}
          order={order}
        />
      ))}
    </ListGroup>
  </div>
) : null);

OrderList.propTypes = {
  orders: PropTypes.arrayOf(Order).isRequired,
};

export default OrderList;
