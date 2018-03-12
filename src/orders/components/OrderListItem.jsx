import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import React from 'react';

import { Order } from '../../proptypes';

import Flex from '../../components/Flex';
import FlexLabel from '../../components/FlexLabel';
import Message from '../../containers/Message';
import OrderStatusLabel from './OrderStatusLabel';

const OrderListItem = ({ order }) => (
  <ListGroupItem>
    <Flex justify="between">
      <FlexLabel>
        <span>{order.year ? order.year.year : null}</span>
        <div>
          <div><Message name="orders.number" data={{ symvar: order.symvar }} /></div>
          <div>{order.workshop ? order.workshop.name : null}</div>
        </div>
      </FlexLabel>
      <OrderStatusLabel {...order} endsAt={order.reservation.endsAt} />
    </Flex>
  </ListGroupItem>
);

OrderListItem.propTypes = {
  order: Order.isRequired,
};

export default OrderListItem;
