import React, { PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import Button from './button';
import Link from './link';
import OrderHeader from './order/header';
import OrderPaymentStatus from './orderPaymentStatus';
import PaymentDetails from './order/paymentDetails';
import Price from './price';

const OrderStatus = ({
  accomodation,
  assigned,
  confirmed,
  canceled,
  endsAt,
  meals,
  onCancel,
  onConfirm,
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
      accomodation={accomodation}
      assigned={assigned}
      canceled={canceled}
      confirmed={confirmed}
      endsAt={endsAt}
      meals={meals}
      paid={paid}
      workshop={workshop}
      year={year}
    />
    { confirmed ? (
      <Link to="participant:changeWorkshop">
        <Button icon="magic">Změnit workshop</Button>
      </Link>
    ) : null }
    { !paid ? (
      <div>
        <h3>Částka k zaplacení</h3>
        <big><Price price={price} /></big>
      </div>
    ) : null}
    { !paid && confirmed && showPaymentDetails ? (
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

    <hr />
    {!paid ? (
      <Button
        bsSize={confirmed ? 'small' : null}
        icon="ban"
        onClick={onCancel}
      >Zrušit objednávku</Button>
    ) : null}
    {!confirmed && !paid ? (
      <Button
        className="pull-right"
        bsStyle="primary"
        onClick={onConfirm}
      >Potvrdit objednávku</Button>
    ) : null}
  </Well>
);

OrderStatus.propTypes = {
  accomodation: PropTypes.object,
  symvar: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  paid: PropTypes.bool,
  overPaid: PropTypes.bool,
  assigned: PropTypes.bool,
  confirmed: PropTypes.bool,
  canceled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
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
  accomodation: null,
  assigned: false,
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
