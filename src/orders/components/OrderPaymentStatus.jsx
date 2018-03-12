import Alert from 'reactstrap/lib/Alert';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../../containers/Message';

const OrderPaymentStatus = ({
  cancelled,
  overPaid,
  paid,
}) => {
  if (cancelled) {
    return <Alert color="info"><Message name="orders.paymentCancelled" /></Alert>;
  }

  if (overPaid) {
    return <Alert color="success"><Message name="orders.overpaid" />!</Alert>;
  }

  if (paid) {
    return <Alert color="success"><Message name="orders.paid" /></Alert>;
  }

  return <Alert color="danger"><Message name="orders.unpaid" /></Alert>;
};

OrderPaymentStatus.propTypes = {
  cancelled: PropTypes.bool,
  overPaid: PropTypes.bool,
  paid: PropTypes.bool,
};

OrderPaymentStatus.defaultProps = {
  cancelled: false,
  overPaid: false,
  paid: false,
};

export default OrderPaymentStatus;
