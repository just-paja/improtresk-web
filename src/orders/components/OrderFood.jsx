import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import { Order } from '../../proptypes';

import Flex from '../../components/Flex';
import FoodSummary from './FoodSummary';
import Meal from '../../food/components/Meal';
import Message from '../../containers/Message';
import Link from '../../containers/Link';

const OrderFood = ({
  isFoodPickingAllowed,
  order,
}) => {
  if (!order) {
    return null;
  }
  return (
    <Card className="mb-4">
      <CardHeader>
        <Flex justify="between">
          <span>
            <FontAwesome name="cutlery" />
            {' '}
            <Message name="orders.food" />
          </span>
          {isFoodPickingAllowed && order.meals.length ? (
            <Link to="participantChangeFood"><Message name="orders.changeFood" /></Link>
          ) : null}
        </Flex>
      </CardHeader>
      <CardBody>
        { order.confirmed ? (
          <FoodSummary closed={false} meals={order.meals} />
        ) : (
          <ul className="list-unstyled">
            {order.meals.map(meal => (
              <li key={meal.date}><Meal name={meal.name} date={meal.date} /></li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};

OrderFood.propTypes = {
  order: Order,
  isFoodPickingAllowed: PropTypes.bool,
};

OrderFood.defaultProps = {
  order: null,
  isFoodPickingAllowed: false,
};

export default OrderFood;
