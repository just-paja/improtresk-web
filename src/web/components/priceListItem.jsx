import React, { PropTypes } from 'react';

import HumanDate from './humanDate';
import Price from './price';

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
);

PriceListItem.propTypes = {
  endsOn: PropTypes.string,
  price: PropTypes.number.isRequired,
  takesEffectOn: PropTypes.string.isRequired,
};

PriceListItem.defaultProps = {
  endsOn: null,
};

export default PriceListItem;
