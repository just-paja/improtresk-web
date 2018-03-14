// import PropTypes from 'prop-types';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { Order } from '../../proptypes';

import Flex from '../../components/Flex';
import FlexLabel from '../../components/FlexLabel';
import FoodSummary from './FoodSummary';
import Link from '../../containers/Link';
import Meal from '../../food/components/Meal';
import Message from '../../containers/Message';
import OrderPaymentStatus from './OrderPaymentStatus';
import OrderStatusLabel from './OrderStatusLabel';
import OrderTimeout from './OrderTimeout';
import PaymentDetails from './PaymentDetails';
import Price from '../../components/Price';

const RegistrationDetails = ({
  order,
}) => (
  <div>
    <CardHeader>
      <FontAwesome fixedWidth name="info-circle" />
      {' '}
      <Message name="orders.status" />
    </CardHeader>
    <CardBody>
      <FlexLabel>
        <OrderStatusLabel {...order} endsAt={order.reservation.endsAt} />
        <OrderTimeout endsAt={order.reservation.endsAt} />
      </FlexLabel>
      { !order.confirmed ? (
        <div>
          <big>
            <Message name="orders.totalPrice" />
            {': '}
            <Price price={order.price} />
          </big>
        </div>
      ) : null}
      { !order.paid && order.confirmed ? (
        <PaymentDetails
          price={order.remainingPrice}
          symvar={order.symvar}
        />
      ) : null}
      {order.confirmed && !order.paid ? (
        <OrderPaymentStatus
          cancelled={order.cancelled}
          paid={order.paid}
          overPaid={order.overPaid}
        />
      ) : null}
    </CardBody>
    <CardHeader>
      <Flex justify="between">
        <span>
          <FontAwesome fixedWidth name="street-view" />
          {' '}
          <Message name="orders.workshop" />
        </span>
        { order.confirmed ? (
          <Link className="ml-auto" to="participantChangeWorkshop">
            <Message name="orders.changeWorkshop" />
          </Link>
        ) : null}
      </Flex>
    </CardHeader>
    <CardBody>
      <p>{order.workshop ? order.workshop.name : <Message name="orders.noWorkshop" />}</p>
    </CardBody>
    <CardHeader>
      <Flex justify="between">
        <span>
          <FontAwesome fixedWidth name="cutlery" />
          {' '}
          <Message name="orders.food" />
        </span>
        { order.confirmed ? (
          <Link className="ml-auto" to="participantChangeFood">
            <Message name="orders.changeFood" />
          </Link>
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
    <CardHeader>
      <FontAwesome fixedWidth name="bed" />
      {' '}
      <Message name="orders.accomodation" />
    </CardHeader>
    <CardBody>
      <p>
        {order.accomodation ?
          order.accomodation.name :
          <Message name="orders.noAccomodation" />
        }
      </p>
    </CardBody>
  </div>
);

RegistrationDetails.propTypes = {
  order: Order.isRequired,
};

RegistrationDetails.defaultProps = {
};

export default RegistrationDetails;
