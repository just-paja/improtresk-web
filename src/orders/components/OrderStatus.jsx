import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../components/Button';
import FoodSummary from './FoodSummary';
import Link from '../../containers/Link';
import OrderPaymentStatus from './OrderPaymentStatus';
import PaymentDetails from './PaymentDetails';
import Price from '../../components/Price';
import OrderStatusLabel from './OrderStatusLabel';

const OrderStatus = ({
  accomodation,
  assigned,
  confirmed,
  cancelled,
  endsAt,
  foodPickCloseDate,
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
}) => {
  const foodPickClosed = foodPickCloseDate && moment().isAfter(foodPickCloseDate);

  return (
    <div>
      <h2>Moje objednávka</h2>
      <OrderStatusLabel
        assigned={assigned}
        confirmed={confirmed}
        cancelled={cancelled}
        paid={paid}
        endsAt={endsAt}
      />
      <h3>
        <FontAwesome className="fa-fw" name="street-view" /> Workshop
        { confirmed ? (
          <small>
            {' '}|{' '}
            <Link to="participantChangeWorkshop">Změnit workshop</Link>
          </small>
        ) : null}
      </h3>
      <p>{workshop.name || 'Nevybráno'}</p>

      <h3>
        <FontAwesome className="fa-fw" name="cutlery" /> Jídlo
        { confirmed ? (
          <small>
            {' '}|{' '}
            { foodPickClosed ?
              <span>Již nelze změnit</span> :
              <Link to="participantChangeFood">Vybrat jídlo</Link>
            }
          </small>
        ) : null }
      </h3>
      <FoodSummary closed={foodPickClosed} meals={meals} />
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
          cancelled={cancelled}
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
        >
          Zrušit objednávku
        </Button>
      ) : null}
      {!confirmed && !paid ? (
        <Button
          className="pull-right"
          color="primary"
          onClick={onConfirm}
        >
          Potvrdit objednávku
        </Button>
      ) : null}
    </div>
  );
};

OrderStatus.propTypes = {
  accomodation: PropTypes.object,
  symvar: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  foodPickCloseDate: PropTypes.string,
  price: PropTypes.number.isRequired,
  paid: PropTypes.bool,
  overPaid: PropTypes.bool,
  assigned: PropTypes.bool,
  confirmed: PropTypes.bool,
  cancelled: PropTypes.bool,
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
  cancelled: false,
  confirmed: false,
  foodPickCloseDate: null,
  overPaid: false,
  paid: false,
  showPaymentDetails: false,
  showPaymentStatus: false,
  workshop: null,
};

export default OrderStatus;
