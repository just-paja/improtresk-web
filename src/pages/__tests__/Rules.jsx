import React from 'react'

import Rules from '../Rules'

import { renderContainer } from '../../../mock/containers'

describe('Rules page', () => {
  let comp

  beforeEach(() => {
    const state = {
      years: {
        rules: {
          data: {
            text: 'foo'
          },
          valid: true
        },
        list: {
          data: [
            {
              id: 150,
              current: true,
              topic: 'foo'
            }
          ],
          valid: true
        }
      },
      texts: {}
    }
    comp = renderContainer(<Rules />, state)
  })

  it('provides translate method', () => {
    expect(comp.find('RulesPage')).toHaveProp('translate')
  })
})
