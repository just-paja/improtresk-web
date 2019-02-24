import React from 'react'
import configureStore from 'redux-mock-store'

import { shallow } from 'enzyme'

import AccomodationList from '../AccomodationList'

import { accomodationListFetch } from '../../actions'

const mockStore = configureStore()

describe('AccomodationList container', () => {
  let comp
  let store

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs']
      },
      accomodation: {
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
      },
      years: {
        capacity: {}
      }
    })
    comp = shallow(<AccomodationList />, {
      context: { store }
    })
  })

  it('provides list of accomodation', () => {
    expect(comp.dive().dive().find('AccomodationList')).toHaveProp('accomodationList', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs',
        capacityStatus: {}
      }
    ])
  })

  it('dispatches accomodation required action on mount', () => {
    comp.dive()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: accomodationListFetch.SUBSCRIBE
    }))
  })

  it('dispatches accomodation left on unmount', () => {
    comp.dive().unmount()
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: accomodationListFetch.UNSUBSCRIBE
    }))
  })
})
