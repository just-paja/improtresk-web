import React from 'react'

import MarkerMap from '../MarkerMap'

import { renderContainer } from '../../../../mock/containers'

describe('MarkerMap container', () => {
  let comp

  beforeEach(() => {
    const state = {
      locations: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              address: 'Nádražní 10',
              name: 'lunch'
            }
          ]
        },
        geocode: {
          'Nádražní 10': {
            valid: true,
            data: {
              lat: 15,
              lng: 16
            }
          }
        }
      }
    }
    comp = renderContainer(<MarkerMap />, state)
  })

  it('provides list of locations', () => {
    expect(comp.find('withScriptjs(withGoogleMap(MarkerMapComponent))')).toHaveProp('markers', [
      {
        id: 20,
        address: 'Nádražní 10',
        name: 'lunch',
        lat: 15,
        lng: 16
      }
    ])
  })

  it('dispatches news required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'LOCATIONS_REQUIRED'
    }))
  })
})
