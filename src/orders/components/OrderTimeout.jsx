import PropTypes from 'prop-types';
import React from 'react';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

import Countdown from '../../components/Countdown';
import Message from '../../containers/Message';

const OrderTimeout = ({ endsAt }) => (
  <span id="reservation-trigger-tooltip">
    <UncontrolledTooltip placement="bottom" target="reservation-trigger-tooltip">
      <Message name="orders.orderExpiresHelp" />
    </UncontrolledTooltip>
    <Countdown countdownMessage="orders.expiresIn" readyMessage="orders.timedOut" date={endsAt} />
  </span>
);

OrderTimeout.propTypes = {
  endsAt: PropTypes.string.isRequired,
};

export default OrderTimeout;
