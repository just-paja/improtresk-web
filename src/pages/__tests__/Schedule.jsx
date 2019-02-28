import React from 'react'

import Schedule from '../Schedule'

import { renderContainer } from '../../../mock/containers'

describe('Schedule container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Schedule />)
  })

  it('provides translate method', () => {
    expect(comp.find('Schedule')).toHaveProp('translate')
  })
})
