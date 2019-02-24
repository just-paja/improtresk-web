import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import MarkerMap from '../MarkerMap'

const mockStore = configureStore()

describe('MarkerMap container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs']
      },
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
    })
    comp = shallow(<MarkerMap />, {
      context: { store }
    })
  })

  it('provides list of locations', () => {
    expect(comp.dive().dive().find('withScriptjs(withGoogleMap(MarkerMapComponent))')).toHaveProp('markers', [
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
    comp.dive()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: 'LOCATIONS_REQUIRED'
    }))
  })
})
