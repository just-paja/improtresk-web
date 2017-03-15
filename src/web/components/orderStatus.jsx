import React, { PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import OrderHeader from './order/header';
import OrderPaymentStatus from './orderPaymentStatus';
import PaymentDetails from './order/paymentDetails';
import Price from './price';

const OrderStatus = ({
  confirmed,
  canceled,
  endsAt,
  meals,
  overPaid,
  paid,
  price,
  showPaymentDetails,
  showPaymentStatus,
  symvar,
  workshop,
  year,
}) => (
  <Well>
    <h2>Moje objednávka</h2>
    <OrderHeader
      canceled={canceled}
      confirmed={confirmed}
      endsAt={endsAt}
      meals={meals}
      paid={paid}
      workshop={workshop}
      year={year}
    />
    <h3>Částka k zaplacení</h3>
    <big><Price price={price} /></big>
    { showPaymentDetails ? (
      <div>
        <h3>Platba</h3>
        <PaymentDetails
          price={price}
          symvar={symvar}
        />
      </div>
    ) : null}
    {showPaymentStatus ? (
      <OrderPaymentStatus
        canceled={canceled}
        paid={paid}
        overPaid={overPaid}
      />
    ) : null}
  </Well>
);

OrderStatus.propTypes = {
  symvar: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  paid: PropTypes.bool,
  overPaid: PropTypes.bool,
  confirmed: PropTypes.bool,
  canceled: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  showPaymentDetails: PropTypes.bool,
  showPaymentStatus: PropTypes.bool,
  year: PropTypes.object,
  workshop: PropTypes.shape({
    name: PropTypes.string,
    lectors: PropTypes.arrayOf(PropTypes.shape({
      lector: PropTypes.shape({
        name: PropTypes.string,
        about: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.object).isRequired,
      }),
      role: PropTypes.string,
    })).isRequired,
  }),
};

OrderStatus.defaultProps = {
  canceled: false,
  confirmed: false,
  endsAt: null,
  overPaid: false,
  paid: false,
  reservation: null,
  showPaymentDetails: false,
  showPaymentStatus: false,
  workshop: null,
  year: null,
};

export default OrderStatus;
