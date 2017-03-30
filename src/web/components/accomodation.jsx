import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';

import Address from './address';
import Capacity from './capacity';
import Gallery from './gallery';
import Price from './price';
import Prop from './prop';

const Accomodation = ({
  address,
  capacityStatus: {
    assigned,
    capacity,
    freeSpots,
    reserved,
  },
  name,
  price,
  desc,
  photos,
}) => (
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
        <Capacity
          assigned={assigned}
          capacity={capacity}
          freeSpots={freeSpots}
          reserved={reserved}
        />
      </Prop>
    </ul>

    <Markdown source={desc} />
    <Gallery photos={photos} />
  </div>
);

Accomodation.propTypes = {
  address: PropTypes.string,
  capacityStatus: PropTypes.shape({
    assigned: PropTypes.number,
    capacity: PropTypes.number,
    freeSpots: PropTypes.number,
    reserved: PropTypes.number,
  }).isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  price: PropTypes.number,
  desc: PropTypes.string.isRequired,
};

Accomodation.defaultProps = {
  address: null,
  available: null,
  price: null,
};

export default Accomodation;
