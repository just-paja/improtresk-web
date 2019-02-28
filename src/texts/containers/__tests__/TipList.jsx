import React from 'react'

import TipList from '../TipList'

import { renderContainer } from '../../../../mock/containers'

describe('TipList container', () => {
  let comp

  beforeEach(() => {
    const state = {
      texts: {
        tips: {
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
      }
    }
    comp = renderContainer(<TipList />, state)
  })

  it('provides list of tips', () => {
    expect(comp.find('TipList')).toHaveProp('tips', [
      {
        id: 20,
        createdAt: '2017-03-05T00:00:00',
        name: 'lunch',
        text: 'foo',
        lang: 'cs',
        photos: []
      }
    ])
  })

  it('dispatches tips required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'TIPS_REQUIRED'
    }))
  })
})
