import React from 'react'

import Tips from '../Tips'

import { renderContainer } from '../../../mock/containers'

describe('Tips container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Tips />)
  })

  it('provides translate method', () => {
    expect(comp.find('Tips')).toHaveProp('translate')
  })
})
