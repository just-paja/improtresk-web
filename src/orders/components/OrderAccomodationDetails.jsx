import React from 'react';

import { Accomodation } from '../../proptypes';

import Address from '../../components/Address';
import Message from '../../containers/Message';
import Price from '../../components/Price';
import Prop from '../../components/Prop';

const OrderAccomodationDetails = ({ item }) => (
  <div>
    <big>{item.name}</big>
    <ul className="list-unstyled">
      {item.address ?
        <Prop label={<Message name="accomodation.address" />} icon="map-marker">
          <Address address={item.address} />
        </Prop> : null
      }
      <Prop label={<Message name="accomodation.price" />} icon="money">
        <Price freeMessage="accomodation.priceIncluded" price={item.price} />
      </Prop>
    </ul>
  </div>
);

OrderAccomodationDetails.propTypes = {
  item: Accomodation.isRequired,
};

export default OrderAccomodationDetails;
