import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import Button from './button';
import Link from './link';
import FoodSummary from './order/foodSummary';
import Status from './order/status';
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
}) => (
  <Well>
    <h2>Moje objednávka</h2>
    <Status
      assigned={assigned}
      confirmed={confirmed}
      canceled={canceled}
      paid={paid}
      endsAt={endsAt}
    />
    <h3>
      <FontAwesome className="fa-fw" name="street-view" /> Workshop
      { confirmed ? (
        <small>
          {' '}|{' '}
          <Link to="participant:changeWorkshop">Změnit workshop</Link>
        </small>
      ) : null}
    </h3>
    <p>{workshop.name || 'Nevybráno'}</p>

    <h3>
      <FontAwesome className="fa-fw" name="cutlery" /> Jídlo
      { confirmed ? (
        <small>
          {' '}|{' '}
          <Link to="participant:changeFood">Vybrat jídlo</Link>
        </small>
      ) : null }
    </h3>
    <FoodSummary meals={meals} />
    <h3>
      <FontAwesome className="fa-fw" name="bed" /> Ubytování
    </h3>
    <p>{accomodation ? accomodation.name : null}</p>

    { !paid ? (
      <div>
        <h3>
          <FontAwesome className="fa-fw" name="money" /> Částka k zaplacení
        </h3>
        <big><Price price={price} /></big>
      </div>
    ) : null}
    { !paid && confirmed && showPaymentDetails ? (
      <div>
        <h3><FontAwesome className="fa-fw" name="exchange" /> Platba</h3>
        <PaymentDetails
          price={price}
          symvar={symvar}
        />
      </div>
    ) : null}
    {!paid && showPaymentStatus ? (
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
