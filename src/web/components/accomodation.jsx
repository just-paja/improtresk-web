import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';

import Address from './address';
import Gallery from './gallery';
import Price from './price';
import Prop from './prop';

const Accomodation = ({ address, name, price, text, photos }) => (
  <div>
    <h2>{name}</h2>
    <ul className="list-unstyled">
      <Prop label="Adresa" icon="map-marker">
        <Address address={address} />
      </Prop>
      <Prop label="Příplatek" icon="money">
        <Price price={price} />
      </Prop>
    </ul>

    <Markdown source={text} />
    <Gallery photos={photos} />
  </div>
);

Accomodation.propTypes = {
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  price: PropTypes.number,
  text: PropTypes.string.isRequired,
};

Accomodation.defaultProps = {
  price: null,
};

export default Accomodation;
