import PropTypes from 'prop-types'
import React from 'react'

import PriceListItem from './PriceListItem'

const PriceList = ({ prices }) => (
  prices.length ? (
    <ul>
      {prices.map(price => (
        <li key={price.id}>
          <PriceListItem
            endsOn={price.endsOn}
            takesEffectOn={price.takesEffectOn}
            price={price.price}
          />
        </li>
      ))}
    </ul>
  ) : null
)

PriceList.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    endsOn: PropTypes.string,
    price: PropTypes.number.isRequired,
    takesEffectOn: PropTypes.string.isRequired
  }))
}

PriceList.defaultProps = {
  prices: null
}

export default PriceList
