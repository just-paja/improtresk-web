import React from 'react'

import { shallow } from 'enzyme'

import AccomodationDetails from '../AccomodationDetails'
import AccomodationList from '../AccomodationList'

describe('AccomodationList component', () => {
  it('passes accomodation component to object list', () => {
    const comp = shallow(
      <AccomodationList
        accomodationList={[
          {
            id: 10,
            address: 'Nádražní 846, 399 01 Milevsko',
            available: 15,
            capacityStatus: {
              assigned: 10,
              capacity: 20,
              freeSpots: 5,
              reserved: 5
            },
            desc: 'Some long description',
            name: 'Dům Kultury Milevsko',
            photos: [],
            price: 200
          }
        ]}
      />
    )
    expect(comp.find('ObjectList')).toHaveProp('Component', AccomodationDetails)
  })

  it('passes accomodation list to object list', () => {
    const comp = shallow(
      <AccomodationList
        accomodationList={[
          {
            id: 10,
            address: 'Nádražní 846, 399 01 Milevsko',
            available: 15,
            capacityStatus: {
              assigned: 10,
              capacity: 20,
              freeSpots: 5,
              reserved: 5
            },
            desc: 'Some long description',
            name: 'Dům Kultury Milevsko',
            photos: [],
            price: 200
          }
        ]}
      />
    )
    expect(comp.find('ObjectList')).toHaveProp('data', [
      {
        id: 10,
        address: 'Nádražní 846, 399 01 Milevsko',
        available: 15,
        capacityStatus: {
          assigned: 10,
          capacity: 20,
          freeSpots: 5,
          reserved: 5
        },
        desc: 'Some long description',
        name: 'Dům Kultury Milevsko',
        photos: [],
        price: 200
      }
    ])
  })
})
