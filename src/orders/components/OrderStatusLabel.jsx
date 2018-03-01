import Label from 'reactstrap/lib/Label';
import PropTypes from 'prop-types';
import React from 'react';

import OrderTimeout from './OrderTimeout';

const OrderStatus = ({
  assigned,
  canceled,
  confirmed,
  endsAt,
  paid,
  translate,
}) => {
  if (canceled) {
    return <Label color="danger">{translate('orders.canceled')}</Label>;
  }

  if (assigned) {
    return <Label color="success">{translate('orders.assigned')}</Label>;
  }

  if (paid) {
    return <Label color="info">{translate('orders.waitingToBeAssigned')}</Label>;
  }

  if (confirmed) {
    return (
      <span>
        <Label color="warning">{translate('orders.waitingToBePaid')}</Label>
        <span>
          {' '}
          <OrderTimeout endsAt={endsAt} translate={translate} />
        </span>
      </span>
    );
  }

  return (
    <span>
      <Label color="danger">{translate('orders.unconfirmed')}</Label>
      {' '}
      <OrderTimeout endsAt={endsAt} translate={translate} />
    </span>
  );
};

OrderStatus.propTypes = {
  assigned: PropTypes.bool,
  canceled: PropTypes.bool,
  confirmed: PropTypes.bool,
  endsAt: PropTypes.string.isRequired,
  paid: PropTypes.bool,
  translate: PropTypes.func.isRequired,
};

OrderStatus.defaultProps = {
  assigned: false,
  canceled: false,
  confirmed: false,
  paid: false,
};

export default OrderStatus;
