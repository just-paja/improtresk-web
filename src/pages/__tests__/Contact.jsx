import React from 'react'

import Contact from '../Contact'

import { renderContainer } from '../../../mock/containers'

describe('Contact page', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<Contact />)
  })

  it('provides translate method', () => {
    expect(comp.find('Contact')).toHaveProp('translate')
  })
})
