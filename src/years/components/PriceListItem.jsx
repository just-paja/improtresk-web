import PropTypes from 'prop-types'
import React from 'react'

import HumanDate from '../../components/HumanDate'
import Price from '../../components/Price'

const PriceListItem = ({ endsOn, price, takesEffectOn }) => (
  <span>
    od{' '}
    <HumanDate date={takesEffectOn} />
    {endsOn ? (
      <span>
        {' do '}
        <HumanDate date={endsOn} />
      </span>
    ) : null}
    {': '}
    <Price price={price} />
  </span>
)

PriceListItem.propTypes = {
  endsOn: PropTypes.string,
  price: PropTypes.number.isRequired,
  takesEffectOn: PropTypes.string.isRequired
}

PriceListItem.defaultProps = {
  endsOn: null
}

export default PriceListItem
