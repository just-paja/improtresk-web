import Alert from 'reactstrap/lib/Alert';
import PropTypes from 'prop-types';
import React from 'react';

import Message from '../../containers/Message';

const OrderPaymentStatus = ({
  canceled,
  overPaid,
  paid,
}) => {
  if (canceled) {
    return <Alert color="info"><Message name="orders.paymentCanceled" /></Alert>;
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
  canceled: PropTypes.bool,
  overPaid: PropTypes.bool,
  paid: PropTypes.bool,
};

OrderPaymentStatus.defaultProps = {
  canceled: false,
  overPaid: false,
  paid: false,
};

export default OrderPaymentStatus;
