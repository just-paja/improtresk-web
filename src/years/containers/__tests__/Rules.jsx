import React from 'react'

import Rules from '../Rules'

import { renderContainer } from '../../../../mock/containers'

describe('Rules container', () => {
  let comp

  beforeEach(() => {
    const state = {
      years: {
        rules: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            text: 'foo',
            lang: 'cs'
          }
        }
      }
    }
    comp = renderContainer(<Rules />, state)
  })

  it('provides rules', () => {
    expect(comp.find('Rules')).toHaveProp('rules', {
      id: 20,
      createdAt: '2017-03-05T00:00:00',
      name: 'lunch',
      text: 'foo',
      lang: 'cs'
    })
  })

  it('dispatches news required action on mount', () => {
    expect(comp.store.getActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_RULES_REQUIRED'
    }))
  })
})
