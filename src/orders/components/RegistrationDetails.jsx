// import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import React from 'react';

import { Order } from '../../proptypes';

import Link from '../../containers/Link';
import Message from '../../containers/Message';
import FoodSummary from './FoodSummary';
import OrderPaymentStatus from './OrderPaymentStatus';
import OrderStatusLabel from './OrderStatusLabel';
import PaymentDetails from './PaymentDetails';
import Price from '../../components/Price';

const RegistrationDetails = ({
  order,
}) => (
  <div>
    <h5><Message name="orders.status" /></h5>
    <OrderStatusLabel {...order} endsAt={order.reservation.endsAt} />
    <h5>
      <FontAwesome name="street-view" />
      {' '}
      <Message name="orders.workshop" />
    </h5>
    { order.confirmed ? (
      <small>
        {' '}|{' '}
        <Link to="participantChangeWorkshop"><Message name="orders.changeWorkshop" /></Link>
      </small>
    ) : null}
    <p>{order.workshop ? order.workshop.name : <Message name="orders.noWorkshop" />}</p>
    <h5>
      <FontAwesome name="cutlery" />
      {' '}
      <Message name="orders.food" />
    </h5>
    <FoodSummary closed={false} meals={order.meals} />
    <h5>
      <FontAwesome name="bed" />
      {' '}
      <Message name="orders.accomodation" />
    </h5>
    <p>
      {order.accomodation ?
        order.accomodation.name :
        <Message name="orders.noAccomodation" />
      }
    </p>

    { !order.paid ? (
      <div>
        <h5>
          <FontAwesome className="fa-fw" name="money" /> Částka k zaplacení
        </h5>
        <big><Price price={order.price} /></big>
      </div>
    ) : null}
    { !order.paid && order.confirmed ? (
      <div>
        <h5><FontAwesome className="fa-fw" name="exchange" /> Platba</h5>
        <PaymentDetails
          price={order.price}
          symvar={order.symvar}
        />
      </div>
    ) : null}
    {!order.paid ? (
      <OrderPaymentStatus
        canceled={order.canceled}
        paid={order.paid}
        overPaid={order.overPaid}
      />
    ) : null}
  </div>
);

RegistrationDetails.propTypes = {
  order: Order.isRequired,
};

RegistrationDetails.defaultProps = {
};

export default RegistrationDetails;
