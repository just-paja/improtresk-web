import React from 'react'

import { shallow } from 'enzyme'

import PriceList from '../../components/PriceList'

describe('PriceList component', () => {
  it('renders given price items', () => {
    const comp = shallow(
      <PriceList
        prices={[
          {
            id: 21,
            takesEffectOn: '2016-01-02',
            endsOn: '2016-01-05',
            price: 1200
          }
        ]}
      />
    )
    expect(comp.find('PriceListItem').props()).toMatchObject({
      takesEffectOn: '2016-01-02',
      endsOn: '2016-01-05',
      price: 1200
    })
  })

  it('renders empty without prices', () => {
    expect(shallow(
      <PriceList prices={[]} />
    ).getElement()).toBe(null)
  })
})
