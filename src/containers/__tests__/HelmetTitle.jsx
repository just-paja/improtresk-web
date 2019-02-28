import React from 'react'

import HelmetTitle from '../HelmetTitle'

import { renderContainer } from '../../../mock/containers'

describe('HelmetTitle container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<HelmetTitle title='Some Title' />, {
      years: {
        list: {
          data: [
            {
              id: 13,
              current: true,
              year: '2017'
            }
          ]
        }
      }
    })
  })

  it('provides translate method', () => {
    expect(comp.find('HelmetTitle')).toHaveProp('translate')
  })

  it('provides active year', () => {
    expect(comp.find('HelmetTitle')).toHaveProp('year', {
      id: 13,
      current: true,
      year: '2017'
    })
  })
})
