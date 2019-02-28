import React from 'react'

import WorkshopDetail from '../WorkshopDetail'

import { renderContainer } from '../../../../mock/containers'

describe('WorkshopDetail container', () => {
  let comp

  beforeEach(() => {
    const state = {
      workshops: {
        difficulties: {
          data: []
        },
        lectors: {
          list: {
            data: []
          },
          roles: {
            data: []
          }
        },
        detail: {
          valid: true,
          data: {
            id: 20,
            desc: 'Workshop details',
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            lectors: [],
            photos: [],
            lang: 'cs'
          }
        }
      },
      years: {
        capacity: {
          data: []
        },
        list: {
          data: []
        }
      }
    }
    comp = renderContainer(<WorkshopDetail resourceId='nehraj-349' />, state)
  })

  it('provides list of workshops', () => {
    expect(comp.find('WorkshopDetail')).toHaveProp('workshop', {
      capacityStatus: {},
      createdAt: '2017-03-05T00:00:00',
      desc: 'Workshop details',
      difficulty: null,
      id: 20,
      lang: 'cs',
      lectors: [],
      photos: [],
      name: 'lunch',
      prices: []
    })
  })

  it('dispatches workshop detail required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_REQUIRED',
      slug: 'nehraj-349'
    }))
  })

  it('dispatches workshop detail left action on unmount', () => {
    comp.unmount()
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DETAIL_LEFT'
    }))
  })
})
