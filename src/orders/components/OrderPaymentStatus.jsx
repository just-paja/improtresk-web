import Alert from 'reactstrap/lib/Alert';
import PropTypes from 'prop-types';
import React from 'react';

const OrderPaymentStatus = ({
  canceled,
  overPaid,
  paid,
  translate,
}) => {
  if (canceled) {
    return <Alert bsStyle="info">{translate('orders.paymentCanceled')}</Alert>;
  }

  if (overPaid) {
    return <Alert bsStyle="success">{translate('orders.overpaid')}!</Alert>;
  }

  if (paid) {
    return <Alert bsStyle="success">{translate('orders.paid')}</Alert>;
  }

  return <Alert bsStyle="danger">{translate('orders.unpaid')}</Alert>;
};

OrderPaymentStatus.propTypes = {
  canceled: PropTypes.bool,
  overPaid: PropTypes.bool,
  paid: PropTypes.bool,
  translate: PropTypes.func.isRequired,
};

OrderPaymentStatus.defaultProps = {
  canceled: false,
  overPaid: false,
  paid: false,
};

export default OrderPaymentStatus;
