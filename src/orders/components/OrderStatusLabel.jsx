import Label from 'reactstrap/lib/Label';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../../containers/Message';
import OrderTimeout from './OrderTimeout';

const OrderStatus = ({
  assigned,
  canceled,
  confirmed,
  endsAt,
  paid,
}) => {
  if (canceled) {
    return <Label color="danger"><Message name="orders.canceled" /></Label>;
  }

  if (assigned) {
    return <Label color="success"><Message name="orders.assigned" /></Label>;
  }

  if (paid) {
    return <Label color="info"><Message name="orders.waitingToBeAssigned" /></Label>;
  }

  if (moment().isAfter(endsAt)) {
    return <Label color="warning"><Message name="orders.timedOut" /></Label>;
  }

  if (confirmed) {
    return (
      <span>
        <Label color="warning"><Message name="orders.waitingToBePaid" /></Label>
        <span>
          {' '}
          <OrderTimeout endsAt={endsAt} />
        </span>
      </span>
    );
  }

  return (
    <span>
      <Label color="danger"><Message name="orders.unconfirmed" /></Label>
      {' '}
      <OrderTimeout endsAt={endsAt} />
    </span>
  );
};

OrderStatus.propTypes = {
  assigned: PropTypes.bool,
  canceled: PropTypes.bool,
  confirmed: PropTypes.bool,
  endsAt: PropTypes.string.isRequired,
  paid: PropTypes.bool,
};

OrderStatus.defaultProps = {
  assigned: false,
  canceled: false,
  confirmed: false,
  paid: false,
};

export default OrderStatus;
