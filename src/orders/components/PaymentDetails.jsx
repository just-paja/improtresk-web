import PropTypes from 'prop-types';
import React from 'react';

import Price from '../../components/Price';
import Prop from '../../components/Prop';

// TODO: Render extra payment methods
const PaymentDetails = ({ price, symvar, translate }) => (
  <ul className="list-unstyled">
    <Prop icon="bank" label={translate('orders.accountNumberCzech')}>
      2800754192/2010
    </Prop>
    <Prop icon="money" label={translate('orders.amountToPay')}>
      <Price price={price} />
    </Prop>
    <Prop icon="key" label={translate('orders.symvar')}>{symvar}</Prop>
  </ul>
);

PaymentDetails.propTypes = {
  price: PropTypes.number.isRequired,
  symvar: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
};

export default PaymentDetails;
