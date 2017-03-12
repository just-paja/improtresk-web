import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import React, { PropTypes } from 'react';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Well from 'react-bootstrap/lib/Well';

import Countdown from './countdown';
import HumanDate from './humanDate';
import OrderPaymentStatus from './orderPaymentStatus';
import Price from './price';
import Prop from './prop';
import WorkshopSummaryOneLine from './workshopSummaryOneLine';

const OrderStatus = ({
  canceled,
  endsAt,
  overPaid,
  paid,
  price,
  symvar,
  workshop,
}) => (
  <Well>
    <h2>Moje objednávka</h2>
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id="reservation-trigger-tooltip">
          Pokud vám vyprší rezervace na workshop dřív než přijde platba, tak
          vaše místo nabídneme někomu dalšímu.
        </Tooltip>
      }
    >
      <big>
        <Countdown countdownMessage="Vyprší za" date={endsAt} />:{' '}
        <HumanDate date={endsAt} showTime />
      </big>
    </OverlayTrigger>
    {workshop ? (
      <WorkshopSummaryOneLine
        name={workshop.name}
        lectors={workshop.lectors}
      />
    ) : null}
    <h3>Platba</h3>
    <ul>
      <Prop icon="bank" label="Číslo účtu">
        2800754192/2010
      </Prop>
      <Prop icon="money" label="Částka k zaplacení">
        <Price price={price} />
      </Prop>
      <Prop icon="key" label="Variabilní symbol">{symvar}</Prop>
    </ul>
    <OrderPaymentStatus
      canceled={canceled}
      paid={paid}
      overPaid={overPaid}
    />
  </Well>
);

OrderStatus.propTypes = {
  symvar: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  paid: PropTypes.bool,
  overPaid: PropTypes.bool,
  canceled: PropTypes.bool,
  // reservation: PropTypes.shape({
  //   mealReservation: PropTypes.arrayOf(PropTypes.object),
  //   workshopPrice: PropTypes.number,
  //   accomodation: PropTypes.number,
  // }),
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
  endsAt: null,
  overPaid: false,
  paid: false,
  reservation: null,
  workshop: null,
};

export default OrderStatus;
