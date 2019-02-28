import React from 'react'

import Locations from '../Locations'

import { renderContainer } from '../../../mock/containers'

describe('Locations page', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Locations />)
  })

  it('provides translate method', () => {
    expect(comp.find('Locations')).toHaveProp('translate')
  })
})
