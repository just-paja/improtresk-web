import PropTypes from 'prop-types'
import React from 'react'

import { CapacityStatus, MultiLingualDescription, Photo } from '../../proptypes'

import Address from '../../components/Address'
import Capacity from '../../components/Capacity'
import Gallery from '../../components/Gallery'
import Message from '../../containers/Message'
import MultiLingualMarkdown from '../../containers/MultiLingualMarkdown'
import Price from '../../components/Price'
import Prop from '../../components/Prop'

const AccomodationDetails = ({
  address,
  capacityStatus: {
    assigned,
    capacity,
    freeSpots,
    reserved
  },
  name,
  price,
  description,
  photos
}) => (
  <div>
    <h2>{name}</h2>
    <ul className='list-unstyled'>
      {address
        ? <Prop label={<Message name='accomodation.address' />} icon='map-marker'>
          <Address address={address} />
        </Prop> : null
      }
      <Prop label={<Message name='accomodation.price' />} icon='money'>
        <Price freeMessage='accomodation.priceIncluded' price={price} />
      </Prop>
      <Prop label={<Message name='accomodation.freeSpots' />} icon='bed'>
        <Capacity
          assigned={assigned}
          capacity={capacity}
          freeSpots={freeSpots}
          reserved={reserved}
        />
      </Prop>
    </ul>

    <MultiLingualMarkdown texts={description} />
    <Gallery photos={photos} />
  </div>
)

AccomodationDetails.propTypes = {
  address: PropTypes.string,
  capacityStatus: CapacityStatus.isRequired,
  description: MultiLingualDescription,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(Photo).isRequired,
  price: PropTypes.number
}

AccomodationDetails.defaultProps = {
  address: null,
  description: null,
  price: null
}

export default AccomodationDetails
