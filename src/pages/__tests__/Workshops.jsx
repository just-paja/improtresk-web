import React from 'react'

import Workshops from '../Workshops'

import { renderContainer } from '../../../mock/containers'

describe('Workshops container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Workshops />)
  })

  it('provides translate method', () => {
    expect(comp.find('Workshops')).toHaveProp('translate')
  })
})
