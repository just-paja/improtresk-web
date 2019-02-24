import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import LocationList from '../LocationList'

const mockStore = configureStore()

describe('LocationList container', () => {
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
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              text: 'foo',
              lang: 'cs'
            }
          ]
        }
      }
    })
    comp = shallow(<LocationList to='foo' />, {
      context: { store }
    })
  })

  it('provides list of locations', () => {
    expect(comp.dive().dive().find('LocationList')).toHaveProp('locationList', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs'
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
