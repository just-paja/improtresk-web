import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';

import Address from './address';
import Capacity from './capacity';
import Gallery from './gallery';
import Price from './price';
import Prop from './prop';

const Accomodation = ({ address, available, capacity, name, price, text, photos }) => (
  <div>
    <h2>{name}</h2>
    <ul className="list-unstyled">
      {address ?
        <Prop label="Adresa" icon="map-marker">
          <Address address={address} />
        </Prop> : null
      }
      <Prop label="Příplatek" icon="money">
        <Price freeMessage="V ceně přihlášky" price={price} />
      </Prop>
      <Prop label="Volná místa" icon="bed">
        <Capacity available={available} capacity={capacity} />
      </Prop>
    </ul>

    <Markdown source={text} />
    <Gallery photos={photos} />
  </div>
);

Accomodation.propTypes = {
  address: PropTypes.string,
  available: PropTypes.number,
  capacity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  price: PropTypes.number,
  text: PropTypes.string.isRequired,
};

Accomodation.defaultProps = {
  address: null,
  available: null,
  price: null,
};

export default Accomodation;
