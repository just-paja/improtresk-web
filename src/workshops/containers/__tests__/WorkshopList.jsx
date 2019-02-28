import React from 'react'

import WorkshopList from '../WorkshopList'

import { renderContainer } from '../../../../mock/containers'

describe('WorkshopList container', () => {
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
        list: {
          valid: true,
          data: [
            {
              id: 20,
              createdAt: '2017-03-05T00:00:00',
              name: 'lunch',
              lectors: [],
              lang: 'cs'
            }
          ]
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
    comp = renderContainer(<WorkshopList to='foo' />, state)
  })

  it('provides list of workshops', () => {
    expect(comp.find('WorkshopList')).toHaveProp('workshops', [
      {
        capacityStatus: {},
        createdAt: '2017-03-05T00:00:00',
        difficulty: null,
        id: 20,
        lang: 'cs',
        lectors: [],
        name: 'lunch',
        prices: []
      }
    ])
  })

  it('dispatches workshops required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_INTERACTIVE_REQUIRED'
    }))
  })

  it('dispatches workshops left action on unmount', () => {
    comp.unmount()
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOPS_LEFT'
    }))
  })
})
