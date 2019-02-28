import React from 'react'

import { performerListFetch } from '../../actions'

import PerformerList from '../PerformerList'

import { renderContainer } from '../../../../mock/containers'

describe('PerformerList container', () => {
  let comp

  beforeEach(() => {
    const state = {
      performers: {
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
    }
    comp = renderContainer(<PerformerList to='foo' />, state)
  })

  it('provides list of performers', () => {
    expect(comp.find('PerformerList')).toHaveProp('performerList', [
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
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: performerListFetch.TRIGGER
    }))
  })
})
