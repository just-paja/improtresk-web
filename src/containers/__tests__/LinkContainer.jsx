import React from 'react'

import LinkContainer from '../LinkContainer'

import { renderContainer } from '../../../mock/containers'

describe('LinkContainer container', () => {
  let comp

  beforeEach(() => {
    comp = renderContainer(<LinkContainer to='home'><a /></LinkContainer>)
  })

  it('provides language', () => {
    expect(comp.find('LinkContainer').first()).toHaveProp('lang', 'cs')
  })
})
