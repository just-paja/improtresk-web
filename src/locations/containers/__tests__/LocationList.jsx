import React from 'react'

import LocationList from '../LocationList'

import { renderContainer } from '../../../../mock/containers'

describe('LocationList container', () => {
  let comp

  beforeEach(() => {
    const state = {
      locations: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              text: 'foo',
              lang: 'cs',
              photos: [],
              address: 'Drtinova 10',
              description: [
                { id: 1, lang: 'cs', text: 'Impact Hub' }
              ]
            }
          ]
        }
      }
    }
    comp = renderContainer(<LocationList to='foo' />, state)
  })

  it('provides list of locations', () => {
    expect(comp.find('LocationList')).toHaveProp('locationList', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs',
        photos: [],
        address: 'Drtinova 10',
        description: [
          { id: 1, lang: 'cs', text: 'Impact Hub' }
        ]
      }
    ])
  })

  it('dispatches news required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'LOCATIONS_REQUIRED'
    }))
  })
})
