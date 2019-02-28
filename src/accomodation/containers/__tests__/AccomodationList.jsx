import React from 'react'

import AccomodationList from '../AccomodationList'

import { renderContainer } from '../../../../mock/containers'
import { accomodationListFetch } from '../../actions'

describe('AccomodationList container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<AccomodationList />, {
      accomodation: {
        list: {
          valid: true,
          data: [
            {
              id: 20,
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              text: 'foo',
              lang: 'cs',
              photos: []
            }
          ]
        }
      },
      years: {
        capacity: {}
      }
    })
  })

  it('provides list of accomodation', () => {
    expect(comp.find('AccomodationList')).toHaveProp('accomodationList', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs',
        capacityStatus: {},
        photos: []
      }
    ])
  })

  it('dispatches accomodation required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: accomodationListFetch.SUBSCRIBE
    }))
  })

  it('dispatches accomodation left on unmount', () => {
    comp.unmount()
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: accomodationListFetch.UNSUBSCRIBE
    }))
  })
})
