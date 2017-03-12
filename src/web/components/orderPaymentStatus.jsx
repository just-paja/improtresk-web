import Alert from 'react-bootstrap/lib/Alert';
import React, { PropTypes } from 'react';

const OrderPaymentStatus = ({
  canceled,
  overPaid,
  paid,
}) => {
  if (canceled) {
    return <Alert bsStyle="info">Zrušeno</Alert>;
  }

  if (overPaid) {
    return <Alert bsStyle="success">Přeplatek!</Alert>;
  }

  if (paid) {
    return <Alert bsStyle="success">Zaplaceno</Alert>;
  }

  return <Alert bsStyle="danger">Nezaplaceno</Alert>;
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
