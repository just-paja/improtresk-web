import Alert from 'reactstrap/lib/Alert';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardFooter from 'reactstrap/lib/CardFooter';
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

const isFoodSelected = meals => meals.every(meal => meal.orderedFood && meal.orderedSoup);

const OrderFood = ({
  isFoodPickingAllowed,
  order,
}) => {
  if (!order) {
    return null;
  }
  const foodSelected = isFoodSelected(order.meals);
  return (
    <Card className="mb-4">
      <CardHeader>
        <Flex justify="between">
          <span>
            <FontAwesome name="cutlery" />
            {' '}
            <Message name="orders.food" />
          </span>
          {order.confirmed && isFoodPickingAllowed && order.meals.length ? (
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
      <CardFooter>
        {foodSelected ? (
          <Alert color="success">
            <FontAwesome name="check-circle" />
            {' '}
            <Message name="orders.foodOk" />
          </Alert>
        ) : null}
        {!foodSelected && isFoodPickingAllowed ? (
          <Alert color="danger">
            <FontAwesome name="cutlery" />
            {' '}
            <Message name="orders.foodSelectionRequired" />
            {' '}
            <Link to="participantChangeFood">
              <Message name="orders.foodSelection" />
            </Link>
          </Alert>
        ) : null}
        {!foodSelected && !isFoodPickingAllowed ? (
          <Alert color="warning">
            <FontAwesome name="exclamation-triangle" />
            {' '}
            <Message name="orders.foodSelectionDisabled" />
          </Alert>
        ) : null}
      </CardFooter>
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
