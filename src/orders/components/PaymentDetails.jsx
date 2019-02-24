import PropTypes from 'prop-types'
import React from 'react'

import Message from '../../containers/Message'
import Price from '../../components/Price'
import Prop from '../../components/Prop'

// TODO: Render extra payment methods
const PaymentDetails = ({ price, symvar }) => (
  <ul className='list-unstyled'>
    <Prop icon='bank' label={<Message name='orders.accountNumberCzech' />}>
      2800754192/2010
    </Prop>
    <Prop icon='money' label={<Message name='orders.amountToPay' />}>
      <Price price={price} />
    </Prop>
    <Prop icon='key' label={<Message name='orders.symvar' />}>{symvar}</Prop>
  </ul>
)

PaymentDetails.propTypes = {
  price: PropTypes.number.isRequired,
  symvar: PropTypes.string.isRequired
}

export default PaymentDetails
