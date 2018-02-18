import PropTypes from 'prop-types';
import React from 'react';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

import Countdown from '../../components/Countdown';

const OrderTimeout = ({ endsAt, translate }) => (
  <div id="reservation-trigger-tooltip">
    <UncontrolledTooltip placement="bottom" target="reservation-trigger-tooltip">
      {translate('orders.orderExpiresHelp')}
    </UncontrolledTooltip>
    <Countdown countdownMessage={translate('orders.expiresIn')} date={endsAt} />
  </div>
);

OrderTimeout.propTypes = {
  endsAt: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};

export default OrderTimeout;
