import React from 'react'

import Food from '../Food'

import { renderContainer } from '../../../mock/containers'

describe('Food container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Food />)
  })

  it('provides translate method', () => {
    expect(comp.find('Food')).toHaveProp('translate')
  })
})
