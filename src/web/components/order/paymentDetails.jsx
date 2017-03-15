import React, { PropTypes } from 'react';

import Price from '../price';
import Prop from '../prop';

const PaymentDetails = ({ price, symvar }) => (
  <ul className="list-unstyled">
    <Prop icon="bank" label="Číslo účtu">
      2800754192/2010
    </Prop>
    <Prop icon="money" label="Částka k zaplacení">
      <Price price={price} />
    </Prop>
    <Prop icon="key" label="Variabilní symbol">{symvar}</Prop>
  </ul>
);

PaymentDetails.propTypes = {
  price: PropTypes.number.isRequired,
  symvar: PropTypes.number.isRequired,
};

export default PaymentDetails;
