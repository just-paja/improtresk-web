import Label from 'react-bootstrap/lib/Label';
import React, { PropTypes } from 'react';

import Timeout from './timeout';

const OrderStatus = ({
  canceled,
  confirmed,
  assigned,
  endsAt,
  paid,
}) => {
  if (canceled) {
    return <Label bsStyle="danger">Zrušeno uživatelem</Label>;
  }

  if (assigned) {
    return <Label bsStyle="success">Zařazeno na workshop</Label>;
  }

  if (paid) {
    return <Label bsStyle="info">Zaplaceno, čeká na zařazení</Label>;
  }

  if (confirmed) {
    return (
      <span>
        <Label bsStyle="warning">Potvrzeno uživatelem</Label>
        <span>
          {' '}
          <Timeout endsAt={endsAt} />
        </span>
      </span>
    );
  }

  return (
    <span>
      <Label bsStyle="danger">Nepotvrzeno</Label>
      {' '}
      <Timeout endsAt={endsAt} />
    </span>
  );
};

OrderStatus.propTypes = {
  assigned: PropTypes.bool,
  canceled: PropTypes.bool,
  confirmed: PropTypes.bool,
  paid: PropTypes.bool,
  endsAt: PropTypes.string.isRequired,
};

OrderStatus.defaultProps = {
  assigned: false,
  canceled: false,
  confirmed: false,
  endsAt: null,
  paid: false,
};

export default OrderStatus;
